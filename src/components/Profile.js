import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function Profile() {
  const defaultImage = "/images/photo2.jpg";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("A short description about the user.");
  const [editMode, setEditMode] = useState({ name: false, email: false });
  const [profileImage, setProfileImage] = useState("");
  

  const handleEditToggle = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Fetch user details
  useEffect(() => {
    const userdetails = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://messangerback.onrender.com/api/user/getuser", {
          withCredentials: true,
        });
        
        setName(res.data.name);
        setEmail(res.data.email);
        setProfileImage(res.data.profile);
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    };
    userdetails();
  }, []);

  // Handle profile update (name or email)
  const handleUpdateProfile = async (field) => {
    try {
      axios.defaults.withCredentials = true;
      const payload = { name, email };
      const res = await axios.put("https://messangerback.onrender.com/api/user/update", payload, {
        withCredentials: true,
      });
      toast.success("Details Updated succesfully");
      console.log(res.data)
      setEditMode((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      if(error.response)
        {
          toast.error(error.response.data.message);
        }
        else
        {
          toast.error("something went wrong")
        }
        console.log("error occur in the deleting student data")
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      axios.defaults.withCredentials = true;
      const formData = new FormData();
      formData.append("photo", file);

      const res = await axios.post(
        "https://messangerback.onrender.com/api/user/profileupdate",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile Updated succesfully");
      setProfileImage(res.data.profile);
    } catch (error) {
      if(error.response)
        {
          toast.error(error.response.data.message);
        }
        else
        {
          toast.error("something went wrong")
        }
        console.log("error occur in the deleting student data")
    }
  };

  return (
    <div className="w-screen h-[calc(100vh-75px)] bg-white flex items-center justify-center relative bg-gradient-to-br from-green-100 via-blue-100 to-purple-200 py-10">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profileImage || defaultImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-purple-400 object-cover mb-3"
          />
          <label className="text-sm text-blue-600 cursor-pointer hover:underline">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <div className="flex items-center gap-2">
            {editMode.name ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              <p className="flex-1">{name}</p>
            )}
            <button
              onClick={() =>
                editMode.name ? handleUpdateProfile("name") : handleEditToggle("name")
              }
              className="text-sm text-blue-600 hover:underline"
            >
              {editMode.name ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <div className="flex items-center gap-2">
            {editMode.email ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              <p className="flex-1">{email}</p>
            )}
            <button
              onClick={() =>
                editMode.email ? handleUpdateProfile("email") : handleEditToggle("email")
              }
              className="text-sm text-blue-600 hover:underline"
            >
              {editMode.email ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
}

export default Profile;
