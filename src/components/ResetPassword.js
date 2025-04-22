import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {
  const navigate=useNavigate();
  const location=useLocation();
  const email=location.state?.email;
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const user={
        email,
        otp,
        password:newPassword
      }
      const result=await axios.post('https://messangerback.onrender.com/api/user/resetpassword',user)
      toast.success(result.data.message);

      console.log(result.data.message)
      
      setTimeout(()=>{
        navigate('/login');
      },3000)
      
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
    
    console.log('Resetting password with:', { otp, newPassword });
    // Add reset password logic here
  };

  const handleResendOtp = async(e) => {
    
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const user={
        email
      }
      const result=await axios.post('https://messangerback.onrender.com/api/user/otp',user)
      toast.success(result.data.message);
      console.log(result.data.message)
      setTimeout(()=>{
        navigate('/resetpassword',{state:{email}})
      },3000)
      
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
    console.log('Email submitted:', email);
  };

  return (
    <div className="w-screen h-[calc(100vh-75px)] bg-white flex items-center justify-center relative bg-gradient-to-br from-green-100 via-blue-100 to-purple-200">
      <form
        
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">Reset Password</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-sm text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        </div>

        <button
          type="submit" onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition duration-300"
        >
          Submit
        </button>
      </form>
      <ToastContainer /> 
    </div>
  );
}

export default ResetPassword;
