import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, MoreVertical, MessageSquarePlus } from 'lucide-react';

function UserList({ onUserSelect, selectedUser }) {
  const prof = '/images/profilephoto1.jpg';
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handledata();
  }, []);

  const handledata = async () => {
    try {
      axios.defaults.withCredentials = true;
      const result = await axios.get('https://messangerback.onrender.com/api/user/getusers', {
        withCredentials: true,
      });
      setUsers(result.data);
    } catch (error) {
      console.log("Error fetching users:", error.response || error.message);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-white flex flex-col border-r border-gray-200">
      
      {/* Google-Style Header */}
      <div className="p-4 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-google text-gray-700 font-medium">Messages</h2>
          <div className="flex gap-2 text-gray-500">
             <MessageSquarePlus size={20} className="cursor-pointer hover:text-blue-500 transition-colors" />
             <MoreVertical size={20} className="cursor-pointer hover:text-blue-500 transition-colors" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 py-2.5 pl-10 pr-4 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 border border-transparent focus:border-blue-400 transition-all text-sm"
          />
        </div>
      </div>

      {/* User List Section */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-2">
        {filteredUsers.map((u, index) => {
          // Assign a Google-brand border color based on index
          const colors = ['border-l-blue-500', 'border-l-red-500', 'border-l-yellow-500', 'border-l-green-500'];
          const accentColor = colors[index % colors.length];

          return (
            <div
              key={u._id}
              onClick={() => onUserSelect(u)}
              className={`flex items-center gap-4 px-4 py-3 cursor-pointer transition-all border-l-4
                ${selectedUser?._id === u._id 
                  ? `${accentColor} bg-blue-50` 
                  : 'border-l-transparent hover:bg-gray-50'}`}
            >
              {/* Profile Image with Online Badge */}
              <div className="relative flex-shrink-0">
                <img
                  src={u.profile || prof}
                  alt={u.name}
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100"
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className={`text-[15px] font-medium truncate ${selectedUser?._id === u._id ? 'text-blue-700' : 'text-gray-900'}`}>
                    {u.name}
                  </h3>
                  <span className="text-[10px] text-gray-400">12:45 PM</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">Click to start chatting...</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserList;