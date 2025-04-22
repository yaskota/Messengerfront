import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
function Registration() {
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const [conformpassword,setConformpassword]=useState("")
  const handregister=async(e)=>{
      try {
        e.preventDefault()
        axios.defaults.withCredentials = true;
        if(password!==conformpassword)
        {
          toast.error("Password is not same")
          return;
        }
        const user={
          name,email,password
        }
        const result=await axios.post('https://messangerback.onrender.com/api/user/register',user,{ withCredentials: true })
        toast.success(result.data.message);
        console.log(result.data.message);

        setTimeout(
          ()=>{
            navigate('/login');
          },3000
        )
        
      } catch (error) {
        if(error.response)
          {
            toast.error(error.response.data.message);
          }
          else
          {
            toast.error("something went wrong")
          }
          console.log("error occur in the deleting student data")
      }
  }
  return (
    
    <div className="w-screen h-[calc(100vh-75px)] bg-white flex items-center justify-center relative bg-gradient-to-br from-green-100 via-blue-100 to-purple-200">
      <form className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-purple-700">Register</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={conformpassword}
            onChange={(e)=>setConformpassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          type="submit" onClick={handregister}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition duration-300"
        >
          Register
        </button>
      </form>
      <ToastContainer /> 
    </div>
  );
}

export default Registration;
