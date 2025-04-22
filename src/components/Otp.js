import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'
function Otp() {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');

  const handlesubmit = async(e) => {
    
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
        onSubmit={handlesubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">Enter Your Email</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <button
          type="submit" onClick={handlesubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition duration-300"
        >
          Submit
        </button>
      </form>
      <ToastContainer /> 
    </div>
  );
}

export default Otp;
