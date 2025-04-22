// components/Header.js
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Header() {
  const prof = "https://randomuser.me/api/portraits/men/1.jpg";
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profilePhoto,setProfilePhoto]=useState("")
  console.log("header :",user)
  useEffect(()=>{
    setProfilePhoto(user?.profile || prof)
    
  },[user])
  

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white">
      <h1 className="text-xl font-bold tracking-wide">Messenger</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <img
              src={profilePhoto}
              onClick={() => navigate("/profile")}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
            <button
              onClick={() => {
                logout();
                setTimeout(()=>{
                  navigate("/");
                },2000)
                
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
