// components/ChatPage.js
import React, { useState, useRef, useEffect } from "react";
import { MdCall } from "react-icons/md";
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
        const res = await axios.get(
          "https://messangerback.onrender.com/api/user/getuser",
          {
            withCredentials: true,
          }
        );
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
      const isRelevant =
        (msg.sender === selectedUser._id && msg.receiver === currentUser._id) ||
        (msg.sender === currentUser._id && msg.receiver === selectedUser._id);

      if (isRelevant) setMessages((prev) => [...prev, msg]);
    });

    return () => socket.current.disconnect();
  }, [currentUser, selectedUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `https://messangerback.onrender.com/api/message/msgreceive/${selectedUser._id}`,
          { withCredentials: true }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Message fetch error:", err);
      } finally {
        setInput("");
        setImage(null);
        setPreviewImage(null);
        fileInputRef.current && (fileInputRef.current.value = null);
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
        const msg = {
          sender: currentUser._id,
          receiver: selectedUser._id,
          fileurl: base64Image,
          content: "",
          timestamp,
        };

        socket.current.emit("sendImage", {
          image: base64Image,
          to: selectedUser._id,
        });

        setMessages((prev) => [...prev, msg]);
      };
      reader.readAsDataURL(image);
    }

    if (input.trim()) {
      const msg = {
        sender: currentUser._id,
        receiver: selectedUser._id,
        content: input,
        fileurl: null,
        timestamp,
      };

      socket.current.emit("sendMessage", {
        content: input,
        to: selectedUser._id,
      });

      setMessages((prev) => [...prev, msg]);
    }

    setInput("");
    setImage(null);
    setPreviewImage(null);
    fileInputRef.current && (fileInputRef.current.value = null);
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
    <div className="flex flex-col h-full w-full bg-white shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-purple-600 text-white shadow">
        <div className="flex items-center gap-4">
          <div className="md:hidden mr-2">
            <button onClick={onBack} className="text-white text-xl font-bold">
              ←
            </button>
          </div>
          <img
            src={selectedUser.profile || prof}
            className="w-10 h-10 rounded-full"
            alt="User"
          />
          <div>
            <div className="font-semibold text-base">{selectedUser.name}</div>
            <div className="text-sm text-gray-200">
              {selectedUser.lastseen
                ? `Last seen at ${new Date(
                    selectedUser.lastseen
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "Last seen unknown"}
            </div>
          </div>
        </div>
        <MdCall size={24} className="cursor-pointer hover:text-green-400" />
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-indigo-50 space-y-4">
        {messages.map((msg, idx) => {
          const isMe = msg.sender === currentUser._id;
          return (
            <div
              key={idx}
              className={`flex items-end ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <img
                  src={selectedUser.profile || prof}
                  className="w-8 h-8 rounded-full mr-2"
                  alt="Profile"
                />
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
                  isMe
                    ? "bg-purple-200 text-black rounded-bl-none"
                    : "bg-purple-500 text-white rounded-br-none"
                }`}
              >
                {msg.fileurl && (
                  <img
                    src={msg.fileurl}
                    alt="Sent"
                    className="mb-1 max-w-[200px] rounded-md"
                  />
                )}
                {msg.content && <p>{msg.content}</p>}
                <p
                  className={`text-[10px] text-right mt-1 ${
                    isMe ? "text-gray-500" : "text-purple-200"
                  }`}
                >
                  {msg.timestamp
                    ? new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
              {isMe && (
                <img
                  src={currentUser.profile || userProfile}
                  className="w-8 h-8 rounded-full ml-2"
                  alt="Me"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="flex items-center gap-2 p-3 border-t bg-indigo-100">
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Type a message"
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full border border-indigo-300 focus:outline-none"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-indigo-200 px-3 py-2 rounded-full hover:bg-indigo-300 transition"
        >
          📎
        </label>
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>

      {/* Image preview */}
      {previewImage && (
        <div className="p-2 text-center bg-indigo-100">
          <p className="text-sm mb-1">Image ready to send:</p>
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-xs mx-auto rounded"
          />
        </div>
      )}
    </div>
  );
}

export default ChatPage;
