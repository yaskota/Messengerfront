import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
function Login() {
  const { setUser } = useAuth();
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const handlogin=async(e)=>{
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const user={
        email,password
      }
      const result=await axios.post('https://messangerback.onrender.com/api/user/login',user,{ withCredentials: true });
      toast.success(result.data.message);
      console.log(result.data.message)
      setUser(result.data.user);
      setTimeout(()=>{
        
        navigate('/chatting')
      },2000)
      
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
      <form className="bg-white p-6 rounded-xl shadow-2xl w-full h-full sm:h-auto sm:w-full sm:max-w-md space-y-4 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-purple-700">Login</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="text-right">
          <Link to="/otp" className="text-sm text-purple-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit" onClick={handlogin}
          className="w-full bg-purple-600 text-white py-1.5 rounded-lg hover:bg-purple-700 transition"
        >
          Submit
        </button>

        {/* ✅ Signup prompt */}
        <p className="text-sm text-center text-gray-700 mt-2">
          Don’t have an account?{' '}
          <Link to="/register" className="text-purple-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>
      <ToastContainer /> 
    </div>
  );
}

export default Login;
