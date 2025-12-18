import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure this is imported!

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlogin = async (e) => {
    e.preventDefault(); // Moved to top for consistency
    try {
      axios.defaults.withCredentials = true;
      const user = { email, password };
      
      const result = await axios.post('https://messangerback.onrender.com/api/user/login', user, { 
        withCredentials: true 
      });

      toast.success(result.data.message);
      setUser(result.data.user);
      
      setTimeout(() => {
        navigate('/chatting');
      }, 2000);
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      console.error("Login Error:", error);
    }
  };

  return (
    // Changed h-[calc(100vh-75px)] to min-h-screen to avoid overflow issues on mobile
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-blue-100 to-purple-200 flex items-center justify-center p-4">
      
      {/* Container: Max-width keeps it from stretching too far on desktop */}
      <form 
        onSubmit={handlogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 flex flex-col"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700">Login</h2>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        <div className="text-right">
          <Link to="/otp" className="text-sm text-purple-600 hover:text-purple-800 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transform active:scale-[0.98] transition-all shadow-lg"
        >
          Sign In
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-purple-600 hover:underline font-bold">
            Sign up
          </Link>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Login;