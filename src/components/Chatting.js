import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import ChatPage from './ChatPage';
import Default from './Default'; // Your modern EmptyChat component
import EmptyChat from './EmptyChat';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Chatting() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
      if(user===null)
      {
        navigate('/login')
      }
  },user)

  // Responsive Layout Logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden bg-gray-100">
      
      {/* Container for the whole app logic */}
      <div className="flex w-full h-full bg-white shadow-sm overflow-hidden">
        
        {/* LEFT SIDE: User List (Sidebar) */}
        {/* On mobile, only show if no user is selected */}
        {(isMobile ? !selectedUser : true) && (
          <div className="w-full md:w-[350px] lg:w-[400px] flex-shrink-0 border-r border-gray-200 bg-white">
            <UserList 
              onUserSelect={handleUserSelect} 
              selectedUser={selectedUser} 
            />
          </div>
        )}

        {/* RIGHT SIDE: Chat Display Area */}
        {/* On mobile, only show if a user IS selected */}
        {(selectedUser || !isMobile) && (
          <div className="flex-1 flex flex-col h-full relative bg-[#f0f2f5]">
            {selectedUser ? (
              // If a user is selected, show the ChatPage
              <ChatPage 
                selectedUser={selectedUser} 
                onBack={handleBack} 
                isMobile={isMobile}
              />
            ) : (
              // If no user is selected, show the professional Default/Empty state
              <div className="hidden md:flex flex-1 h-full">
                <EmptyChat />
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Chatting;