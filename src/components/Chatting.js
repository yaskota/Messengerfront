import React, { useState } from 'react';
import UserList from './UserList';
import ChatPage from './ChatPage';
import Default from './Default';

function Chatting() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowSidebar(false); // Hide sidebar on mobile
  };

  const handleBack = () => {
    setShowSidebar(true);   // Show sidebar again
    setSelectedUser(null);  // Optional: clear selected user
  };

  return (
    <div className="flex h-[calc(100vh-75px)] w-full overflow-hidden">
      {/* Sidebar (UserList) */}
      {(!selectedUser || showSidebar) && (
        <div className="w-full md:w-1/3 lg:w-1/4 border-r bg-white">
          <UserList onUserSelect={handleUserSelect} selectedUser={selectedUser} />
        </div>
      )}

      {/* Chat View (ChatPage or Default) */}
      {selectedUser && !showSidebar && (
        <div className="flex-1">
          <ChatPage selectedUser={selectedUser} onBack={handleBack} />
        </div>
      )}

      {/* Large screen default view when no user is selected */}
      {!selectedUser && !showSidebar && (
        <div className="flex-1 hidden md:flex">
          <Default />
        </div>
      )}
    </div>
  );
}

export default Chatting;
