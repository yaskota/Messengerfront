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
  <div style={{ 
    minHeight: '100vh', 
    width: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '20px',
    background: 'linear-gradient(to bottom right, #dcfce7, #dbeafe, #e9d5ff)' 
  }}>
    <form 
      onSubmit={handlogin}
      className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col space-y-6"
      style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
    >
      <h2 className="text-3xl font-bold text-center text-purple-700">Login</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="text-right">
        <Link to="/otp" className="text-sm text-purple-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg active:scale-95"
      >
        Sign In
      </button>

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