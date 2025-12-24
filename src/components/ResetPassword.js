import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { KeyRound, Lock, Eye, EyeOff, RefreshCw, CheckCircle2 } from 'lucide-react';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const logo = "/images/photo2.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email session expired. Please request OTP again.");
      return;
    }
    try {
      axios.defaults.withCredentials = true;
      const user = { email, otp, password: newPassword };
      const result = await axios.post('https://messangerback.onrender.com/api/user/resetpassword', user);
      
      toast.success(result.data.message);
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setIsResending(true);
    try {
      axios.defaults.withCredentials = true;
      const result = await axios.post('https://messangerback.onrender.com/api/user/otp', { email });
      toast.success("New OTP sent to your email!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resending OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-[420px] p-8 flex flex-col gap-5 border border-white/50"
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
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Set New Password</h2>
          <p className="text-gray-400 text-sm mt-1 px-2">
            Verifying for <span className="text-purple-600 font-semibold">{email || "your email"}</span>
          </p>
        </div>

        <div className="space-y-4 mt-2">
          {/* OTP Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1 uppercase tracking-wider">Verification OTP</label>
            <div className="relative group">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all tracking-[0.2em] font-mono text-center"
                required
              />
            </div>
          </div>

          {/* New Password Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Password</label>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 disabled:opacity-50"
              >
                <RefreshCw size={12} className={isResending ? "animate-spin" : ""} />
                Resend OTP
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 cursor-pointer z-50 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-200 active:scale-[0.98]"
        >
          <CheckCircle2 size={18} />
          Reset Password
        </button>

        <p className="text-sm text-center text-gray-500 mt-2">
          Suddenly remembered? <Link to="/login" className="text-purple-600 font-bold hover:underline">Sign In</Link>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
}

export default ResetPassword;