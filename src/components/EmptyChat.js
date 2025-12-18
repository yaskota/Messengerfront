import React from "react";
import { Lock, MessageSquarePlus, Image as ImageIcon, Zap } from "lucide-react";

function EmptyChat() {
  const logo = "/images/photo2.jpg";

  return (
    <div className="flex w-full h-full  flex-col items-center justify-center relative bg-[#f9fafb] overflow-hidden">
      
      {/* Subtle Background Pattern Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")` }}>
      </div>

      {/* Decorative Top Accent */}
      

      {/* Main Content */}
      <div className="z-10 text-center px-6 flex flex-col items-center max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Modern Logo Container */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-purple-400 rounded-full blur-[80px] opacity-20 animate-pulse"></div>
          <div className="relative p-2 bg-white rounded-full shadow-2xl border border-gray-100">
            <img
              src={logo}
              alt="Messenger"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-inner"
            />
          </div>
        </div>

        {/* Messaging Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 tracking-tight">
          Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Conversation</span>
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
          Connect with your friends instantly. Send <span className="font-semibold text-gray-700">messages</span>, 
          share <span className="font-semibold text-gray-700">images</span>, and enjoy 
          real-time chatting with anyone, anywhere.
        </p>

        {/* Feature Icons Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-gray-400 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <Zap size={18} className="text-yellow-500" />
            <span className="text-sm font-medium">Real-time</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <ImageIcon size={18} className="text-blue-500" />
            <span className="text-sm font-medium">Image Sharing</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <Lock size={18} className="text-green-500" />
            <span className="text-sm font-medium">Secure</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-400 font-medium italic">Select a contact from the sidebar to begin</p>
          <div className="p-4 bg-purple-50 rounded-full text-purple-600 animate-bounce">
            <MessageSquarePlus size={32} />
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-gray-300 py-1 px-4 bg-white/50 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm">
          <Lock size={12} />
          <span className="text-[10px] uppercase font-bold tracking-[0.2em]">End-to-end encrypted</span>
        </div>
      </div>
      
    </div>
  );
}

export default EmptyChat;