import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Mail, ShieldCheck, ArrowLeft } from 'lucide-react'; // Icons for recovery context

function Otp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const logo = "/images/photo2.jpg";

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const result = await axios.post('https://messangerback.onrender.com/api/user/otp', { email });
      
      toast.success(result.data.message);
      
      setTimeout(() => {
        navigate('/resetpassword', { state: { email } });
      }, 3000);
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      
      {/* Recovery Card */}
      <form 
        onSubmit={handlesubmit}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-[400px] p-8 flex flex-col gap-6 border border-white/50"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <div className="p-1 rounded-2xl bg-gradient-to-tr from-orange-400 to-red-500 mb-4 shadow-lg">
             <img 
               src={logo} 
               alt="Logo" 
               className="w-16 h-16 rounded-[14px] object-cover border-2 border-white"
             />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Forgot Password?</h2>
          <p className="text-gray-400 text-sm mt-1 px-4">
            Enter your email and we'll send you an OTP to reset your password.
          </p>
        </div>

        {/* Input Section */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 ml-1 uppercase tracking-wider">Registered Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} text-white font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-200 active:scale-[0.98]`}
          >
            {loading ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              <>
                <ShieldCheck size={18} />
                Send OTP
              </>
            )}
          </button>

          {/* Back to Login Link */}
          <Link 
            to="/login" 
            className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-purple-600 transition-colors mt-2"
          >
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>
      </form>

      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false}
        theme="colored" /* 'colored' theme looks great for top notifications */
      />
    </div>
  );
}

export default Otp;