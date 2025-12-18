import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react'; 

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpassword, setConformpassword] = useState("");
  
  // Separate states for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const logo = "/images/photo2.jpg";

  const handregister = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      if (password !== conformpassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      const user = { name, email, password };
      const result = await axios.post('https://messangerback.onrender.com/api/user/register', user, { withCredentials: true });
      
      toast.success(result.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      
      <form 
        onSubmit={handregister}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-[450px] p-8 flex flex-col gap-4 border border-white/50"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <div className="p-1 rounded-2xl bg-gradient-to-tr from-purple-500 to-blue-500 mb-4 shadow-lg">
             <img 
               src={logo} 
               alt="Logo" 
               className="w-16 h-16 rounded-[14px] object-cover border-2 border-white"
             />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Join our community today</p>
        </div>

        <div className="space-y-3 mt-2">
          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">Email Address</label>
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

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">Password</label>
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-purple-600 cursor-pointer z-50 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">Confirm Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-gray-400" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={conformpassword}
                onChange={(e) => setConformpassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 text-gray-400 hover:text-purple-600 cursor-pointer z-50 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-200 active:scale-[0.98]"
        >
          <UserPlus size={18} />
          Create Account
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account? <Link to="/login" className="text-purple-600 font-bold hover:text-purple-800 transition-colors">Sign In</Link>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
}

export default Registration;