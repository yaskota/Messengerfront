import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-10">Checking user...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
