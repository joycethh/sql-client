import React from "react";
import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuthContext();

  return currentUser ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
