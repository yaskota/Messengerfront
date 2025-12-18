// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Header from './components/Header';
import Login from './components/Login';
import Registration from './components/Registration';
import Otp from './components/Otp';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import UserList from './components/UserList';
import ChatPage from './components/ChatPage';
import Default from './components/Default';
import EmptyChat from './components/EmptyChat';
import Chatting from './components/Chatting';

// This decides what to render at "/"
function RootRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return user ? <Chatting /> : <Default />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Default />} />

          {/* Auth related */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* User & chat related */}
          <Route path="/profile" element={<Profile />} />

          <Route path="/chatting" element={<Chatting />} />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
