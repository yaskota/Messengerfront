import React from 'react';

function Default() {
  const logo = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"; // Your logo URL

  return (
    <div className="w-full h-[70vh] relative bg-white flex items-center justify-center overflow-hidden">
      {/* Background Logo */}
      <img
        src={logo}
        alt="Logo"
        className="absolute opacity-5 w-[400px] h-[400px] object-contain"
      />

      {/* Main Text */}
      <div className="z-10 text-center px-6">
        <h1 className="text-4xl font-semibold text-green-600 mb-4">Welcome to My WhatsApp</h1>
        <p className="text-gray-700 text-lg">
          A simple chat app where you can send messages, images, and enjoy real-time conversations.
          <br />Built using the MERN stack & Socket.io 🚀
        </p>
      </div>
    </div>
  );
}

export default Default;
