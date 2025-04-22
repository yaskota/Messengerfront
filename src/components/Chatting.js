// components/Chatting.js
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

  return (
    <div className="flex h-[calc(100vh-75px)] w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? 'block' : 'hidden'
        } md:block w-full md:w-1/3 lg:w-1/4 border-r bg-white`}
      >
        <UserList
          onUserSelect={handleUserSelect}
          selectedUser={selectedUser}
        />
      </div>

      {/* Chat view */}
      <div className="flex-1">
        {selectedUser ? (
          <ChatPage
            selectedUser={selectedUser}
            onBack={() => setShowSidebar(true)}
          />
        ) : (
          <Default />
        )}
      </div>
    </div>
  );
}

export default Chatting;
