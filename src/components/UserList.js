// components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList({ onUserSelect, selectedUser }) {
  const prof = '/images/photo1.jpg';
  const [user, setUser] = useState([]);

  useEffect(() => {
    handledata();
  }, []);

  const handledata = async () => {
    try {
      axios.defaults.withCredentials = true;
      const result = await axios.get('https://messangerback.onrender.com/api/user/getusers', {
        withCredentials: true,
      });
      setUser(result.data);
    } catch (error) {
      console.log("Error fetching users:", error.response || error.message);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-75px)] bg-gradient-to-b from-purple-100 via-white to-purple-50 shadow-lg border-r border-purple-200 flex flex-col">
      <div className="text-xl font-bold text-center py-5 bg-purple-200 text-purple-900 shadow">
        Chats
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {user.map((u) => (
          <div
            key={u._id}
            onClick={() => onUserSelect(u)}
            className={`flex items-center gap-4 px-4 py-3 border-b border-purple-100 cursor-pointer transition-all 
              hover:bg-purple-50 hover:scale-[1.01]
              ${selectedUser?._id === u._id ? 'bg-purple-100 scale-[1.01]' : 'bg-violet-100'}`}
          >
            <img
              src={u.profile || prof}
              alt={u.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-400 shadow"
            />
            <div>
              <h3 className="text-md font-semibold text-gray-800">{u.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
