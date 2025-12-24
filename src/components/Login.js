import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Ensure lucide-react is installed: npm install lucide-react
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'; 

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  
  const logo = "/images/photo2.jpg";

  const handlogin = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const result = await axios.post('https://messangerback.onrender.com/api/user/login', { email, password });
      toast.success(result.data.message);
      setUser(result.data.user);
      setTimeout(() => { navigate('/chatting'); }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      
      <form 
        onSubmit={handlogin}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-[400px] p-8 flex flex-col gap-5 border border-white/50"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="p-1 rounded-2xl bg-gradient-to-tr from-purple-500 to-blue-500 mb-4 shadow-lg">
             <img src={logo} alt="Logo" className="w-16 h-16 rounded-[14px] object-cover border-2 border-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-1">Login to continue chatting</p>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
              <Link to="/otp" className="text-xs font-bold text-purple-600 hover:text-purple-800">Forgot Password?</Link>
            </div>
            
            {/* Password Wrapper */}
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-gray-400" size={18} />
              
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
                required
              />

              {/* Eye Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 p-1 text-gray-400 hover:text-purple-600 transition-colors cursor-pointer z-50 flex items-center justify-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-200 active:scale-[0.98]"
        >
          <LogIn size={18} />
          Sign In
        </button>

        <p className="text-sm text-center text-gray-500">
          New here? <Link to="/register" className="text-purple-600 font-bold">Create account</Link>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
}

export default Login;