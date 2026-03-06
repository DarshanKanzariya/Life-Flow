import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  // If no token → go login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists but user not loaded yet → wait
  if (!user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;