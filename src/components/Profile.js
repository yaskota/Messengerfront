import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pencil, Save, Camera, User, Mail, FileText, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const defaultImage = "/images/photo2.jpg";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("A short description about the user.");
  const [editMode, setEditMode] = useState({ name: false, email: false });
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleEditToggle = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    const userdetails = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://messangerback.onrender.com/api/user/getuser");
        setName(res.data.name);
        setEmail(res.data.email);
        setProfileImage(res.data.profile);
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    };
    userdetails();
  }, []);

  useEffect(()=>{
        if(user===null)
        {
          navigate('/login')
        }
    },user)

  const handleUpdateProfile = async (field) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.put("https://messangerback.onrender.com/api/user/update", { name, email });
      toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated!`);
      setEditMode((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file);
      const res = await axios.post("https://messangerback.onrender.com/api/user/profileupdate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile picture updated!");
      setProfileImage(res.data.profile);
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="bg-white shadow-2xl rounded-[32px] w-full max-w-lg p-8 border border-white/50 relative overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-500 to-blue-500 opacity-10" />

        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-8 relative pt-4">
          <div className="relative group">
            <img
              src={profileImage || defaultImage}
              alt="Profile"
              className={`w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover transition-all duration-300 ${uploading ? 'opacity-50' : 'group-hover:brightness-75'}`}
            />
            <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/40 p-3 rounded-full text-white">
                <Camera size={24} />
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-500 text-sm">Personal Profile Settings</p>
        </div>

        {/* Info Fields */}
        <div className="space-y-6">
          {/* Name Field */}
          <div className="group">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <User size={14} /> Full Name
            </label>
            <div className="flex items-center gap-3 mt-1 bg-gray-50 p-3 rounded-2xl border border-transparent focus-within:border-purple-300 transition-all">
              {editMode.name ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700 font-medium"
                />
              ) : (
                <p className="flex-1 text-gray-700 font-medium">{name}</p>
              )}
              <button 
                onClick={() => editMode.name ? handleUpdateProfile("name") : handleEditToggle("name")}
                className="text-purple-600 hover:bg-purple-50 p-2 rounded-xl transition-colors"
              >
                {editMode.name ? <Save size={20} /> : <Pencil size={18} />}
              </button>
            </div>
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Mail size={14} /> Email Address
            </label>
            <div className="flex items-center gap-3 mt-1 bg-gray-50 p-3 rounded-2xl border border-transparent focus-within:border-purple-300 transition-all">
              {editMode.email ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700 font-medium"
                />
              ) : (
                <p className="flex-1 text-gray-700 font-medium">{email}</p>
              )}
              <button 
                onClick={() => editMode.email ? handleUpdateProfile("email") : handleEditToggle("email")}
                className="text-purple-600 hover:bg-purple-50 p-2 rounded-xl transition-colors"
              >
                {editMode.email ? <Save size={20} /> : <Pencil size={18} />}
              </button>
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2 mb-1">
              <FileText size={14} /> Bio / Description
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 p-4 rounded-2xl border border-transparent focus:border-purple-300 outline-none text-gray-600 text-sm leading-relaxed resize-none transition-all"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3">
            <button 
              onClick={() => toast.info("Settings saved locally")}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
              Done
            </button>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}

export default Profile;