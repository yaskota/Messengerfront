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
    height: '100vh', 
    width: '100vw', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #dcfce7, #dbeafe, #e9d5ff)',
    padding: '20px'
  }}>
    {/* Explicitly setting max-width and margin auto to prevent stretching */}
    <form 
      onSubmit={handlogin}
      className="bg-white shadow-2xl rounded-2xl flex flex-col"
      style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '2rem',
        gap: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' 
      }}
    >
      <h2 className="text-3xl font-bold text-center text-purple-700 m-0">Login</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-600">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-purple-500"
          style={{ height: '45px' }} // Explicit height
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-600">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-purple-500"
          style={{ height: '45px' }} // Explicit height
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all"
        style={{ height: '50px', marginTop: '10px' }}
      >
        Sign In
      </button>

      <p className="text-sm text-center text-gray-500">
        Don't have an account? <Link to="/register" className="text-purple-600 font-bold">Sign up</Link>
      </p>
    </form>
    <ToastContainer />
  </div>
);
}

export default Login;