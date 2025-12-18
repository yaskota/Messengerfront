import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { LogOut, User as UserIcon, Settings } from "lucide-react"; // Modern icons

function Header() {
  const prof = "/images/profilephoto2.jpg";
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    setProfilePhoto(user?.profile || prof);
  }, [user]);

  return (
    <div className="flex justify-between items-center px-6 h-[65px] shadow-sm bg-white border-b border-gray-200 sticky top-0 z-[100]">
      {/* Brand Section with Google Colors */}
      <div 
        className="flex items-center gap-1 cursor-pointer" 
        onClick={() => navigate("/chatting")}
      >
        <h1 className="text-xl font-medium tracking-tight flex">
          <span className="text-blue-500">M</span>
          <span className="text-red-500">e</span>
          <span className="text-yellow-500">s</span>
          <span className="text-blue-500">s</span>
          <span className="text-green-500">e</span>
          <span className="text-red-500">n</span>
          <span className="text-gray-700">ger</span>
        </h1>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Desktop Settings Icon */}
            <button 
              onClick={() => navigate("/profile")}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
            >
              <Settings size={20} />
            </button>

            {/* Profile Image with Hover Effect */}
            <div className="relative group px-1">
              <img
                src={profilePhoto}
                onClick={() => navigate("/profile")}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover cursor-pointer ring-2 ring-transparent group-hover:ring-blue-400 transition-all shadow-sm"
              />
            </div>

            {/* Google-style Logout Button */}
            <button
              onClick={() => {
                logout();
                setTimeout(() => {
                  navigate("/login");
                }, 1000);
              }}
              className="flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-md shadow-blue-100 transition-all active:scale-95"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;