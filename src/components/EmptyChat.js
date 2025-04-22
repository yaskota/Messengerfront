import React from "react";

function EmptyChat() {
  const logo = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";

  return (
    <div
      className="w-full md:w-[70%] flex flex-col items-center justify-center relative bg-white"
      style={{ height: "calc(100vh - 75px)" }}
    >
      {/* Background Logo */}
      <img
        src={logo}
        alt="WhatsApp Logo"
        className="absolute opacity-10 w-[250px] h-[250px] object-contain"
      />

      {/* Overlay Content */}
      <div className="z-10 text-center px-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">No Conversation Yet</h2>
        <p className="text-gray-600 text-md leading-relaxed">
          Select a chat to start messaging your friend!<br />
          You can send text, images, and stay connected in real-time.<br />
          Powered by <span className="font-semibold text-green-600">MERN Stack</span> &{" "}
          <span className="font-semibold text-blue-500">Socket.io</span>.
        </p>
      </div>
    </div>
  );
}

export default EmptyChat;
