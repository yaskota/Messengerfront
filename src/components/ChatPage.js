import React, { useState, useRef, useEffect } from "react";
import { MdCall, MdArrowBack, MdAttachFile, MdSend, MdClose } from "react-icons/md";
import EmptyChat from "./EmptyChat";
import axios from "axios";
import io from "socket.io-client";

function ChatPage({ selectedUser, onBack }) {
  const prof = "/images/profilephoto1.jpg";
  const userProfile = "/images/profilephoto2.jpg";

  const [currentUser, setCurrentUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://messangerback.onrender.com/api/user/getuser");
        setCurrentUser(res.data);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!currentUser?._id) return;
    socket.current = io("https://messangerback.onrender.com", {
      withCredentials: true,
      transports: ["websocket"],
    });
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("receiveMessage", (msg) => {
      const isRelevant = (msg.sender === selectedUser._id && msg.receiver === currentUser._id) ||
                         (msg.sender === currentUser._id && msg.receiver === selectedUser._id);
      if (isRelevant) setMessages((prev) => [...prev, msg]);
    });
    return () => socket.current.disconnect();
  }, [currentUser, selectedUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const res = await axios.get(`https://messangerback.onrender.com/api/message/msgreceive/${selectedUser._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Message fetch error:", err);
      } finally {
        setInput("");
        setImage(null);
        setPreviewImage(null);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  const handleSend = () => {
    if (!socket.current || !selectedUser) return;
    const timestamp = new Date().toISOString();

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        socket.current.emit("sendImage", { image: base64Image, to: selectedUser._id });
        setMessages((prev) => [...prev, { sender: currentUser._id, receiver: selectedUser._id, fileurl: base64Image, content: "", timestamp }]);
      };
      reader.readAsDataURL(image);
    }

    if (input.trim()) {
      socket.current.emit("sendMessage", { content: input, to: selectedUser._id });
      setMessages((prev) => [...prev, { sender: currentUser._id, receiver: selectedUser._id, content: input, fileurl: null, timestamp }]);
    }

    setInput("");
    setImage(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    inputRef.current?.focus();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (!selectedUser) return <EmptyChat />;

  return (
    <div className="flex flex-col h-full w-full bg-[#E5DDD5]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="md:hidden p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <MdArrowBack size={22} />
          </button>
          <div className="relative">
            <img src={selectedUser.profile || prof} className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" alt="User" />
            <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <div className="font-semibold text-gray-800 text-base leading-tight">{selectedUser.name}</div>
            <div className="text-[11px] text-blue-500 font-bold uppercase tracking-wider">Online</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-full transition-all">
            <MdCall size={22} />
          </button>
        </div>
      </div>

      {/* Messages Area with Fixed Background */}
      <div className="flex-1 relative overflow-hidden">
        {/* The Chat Background Image */}
        <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ 
                backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
                backgroundSize: '400px',
                backgroundRepeat: 'repeat'
            }}
        ></div>

        <div className="relative h-full p-4 overflow-y-auto space-y-4 custom-scrollbar z-10">
          {messages.map((msg, idx) => {
            const isMe = msg.sender === currentUser._id;
            return (
              <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2`}>
                {!isMe && (
                  <img src={selectedUser.profile || prof} className="w-8 h-8 rounded-full mb-1 shadow-sm border border-white" alt="Receiver" />
                )}
                
                <div className={`max-w-[75%] px-4 py-2 shadow-md relative ${
                  isMe ? "bg-[#1A73E8] text-white rounded-2xl rounded-tr-none" : "bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100"
                }`}>
                  {msg.fileurl && <img src={msg.fileurl} alt="Sent" className="mb-2 max-w-full rounded-lg border border-black/10 shadow-inner" />}
                  {msg.content && <p className="text-[15px] leading-relaxed break-words">{msg.content}</p>}
                  <p className={`text-[10px] mt-1 text-right font-medium opacity-70 ${isMe ? "text-white" : "text-gray-400"}`}>
                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                  </p>
                </div>

                {isMe && (
                  <img src={currentUser.profile || userProfile} className="w-8 h-8 rounded-full mb-1 shadow-sm border border-white" alt="Me" />
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Preview Section */}
      {previewImage && (
        <div className="mx-4 mb-2 p-3 bg-white border border-blue-100 rounded-2xl flex items-center gap-4 shadow-xl animate-in slide-in-from-bottom-2 z-20">
          <img src={previewImage} alt="Preview" className="w-16 h-16 object-cover rounded-xl shadow-sm border border-gray-100" />
          <div className="flex-1 text-sm text-gray-500 font-semibold italic">Ready to send...</div>
          <button onClick={() => {setPreviewImage(null); setImage(null)}} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"><MdClose size={22}/></button>
        </div>
      )}

      {/* Input Section */}
      <div className="p-4 bg-white border-t border-gray-100 z-20">
        <div className="flex items-center gap-2 bg-[#F0F2F5] p-1.5 rounded-full border border-gray-200 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer transition-colors">
            <MdAttachFile size={22} className="rotate-45" />
          </label>
          <input
            ref={inputRef}
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent px-2 outline-none text-gray-700 text-[15px] placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() && !image}
            className={`p-3 rounded-full transition-all shadow-sm transform active:scale-90 ${(!input.trim() && !image) ? 'bg-gray-200 text-gray-400' : 'bg-[#1A73E8] text-white hover:bg-blue-700'}`}
          >
            <MdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;