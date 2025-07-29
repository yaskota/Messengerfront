// Chatting.js
import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import ChatPage from './ChatPage';
import Default from './Default';

function Chatting() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
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
    <div className="flex h-[calc(100vh-75px)] w-full overflow-hidden">
      {/* Sidebar (UserList) */}
      {(isMobile ? !selectedUser : true) && (
        <div className="w-full md:w-1/3 lg:w-1/4 border-r bg-white">
          <UserList onUserSelect={handleUserSelect} selectedUser={selectedUser} />
        </div>
      )}

      {/* Chat View */}
      {(selectedUser || !isMobile) && (
        <div className="flex-1">
          {selectedUser ? (
            <ChatPage selectedUser={selectedUser} onBack={handleBack} />
          ) : (
            <div className="hidden md:flex h-full">
              <Default />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Chatting;
