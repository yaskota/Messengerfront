import React from 'react';
import { Lock, Smartphone } from 'lucide-react';

function Default() {
  const logo = "/images/photo2.jpg";

  return (
    <div className="w-full h-screen relative bg-[#f8f9fa] flex flex-col items-center justify-center border-l border-gray-200">
      
      {/* Background Decorative Element */}
      

      {/* Main Content Wrapper - Shifted slightly downward */}
      <div className="flex flex-col items-center text-center px-6 mt-12 animate-in fade-in zoom-in duration-700">
        
        {/* Logo with Ring Effect */}
        <div className="relative mb-10">
          <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse scale-110 opacity-20"></div>
          <img
            src={logo}
            alt="Logo"
            className="relative w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Text Section */}
        <h1 className="text-4xl md:text-5xl font-extralight text-slate-700 mb-6">
          Download <span className="font-medium text-black">WhatsApp for Windows</span>
        </h1>
        
        <p className="max-w-lg text-gray-500 text-base md:text-lg leading-relaxed mb-8">
          Make calls, share your screen and get a faster experience when you download the Windows app.
        </p>

        {/* Action Button (Mimicking the real WhatsApp Web) */}
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-2.5 rounded-full transition-all active:scale-95 shadow-md">
          Get the app
        </button>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm tracking-wide">
          <Lock size={14} className="mb-0.5" />
          <span className="uppercase text-[10px] font-bold">End-to-end encrypted</span>
        </div>
      </div>
      
    </div>
  );
}

export default Default;