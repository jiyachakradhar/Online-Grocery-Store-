import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const loggedIn = useSelector((state) => state.admin.loggedIn);
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
