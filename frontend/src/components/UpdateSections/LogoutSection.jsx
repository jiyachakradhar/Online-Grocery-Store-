// src/components/LogoutSection.js
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/feature/user";
import Button from "../common/Button";
import { useLogoutUserMutation } from "../../store/slice/userSlice";

const LogoutSection = () => {
  const dispatch = useDispatch();
  const [logoutUser, { isloading, user }] = useLogoutUserMutation();
  const handleLogout = async () => {
    const result = await logoutUser().wrap;
    dispatch(logout());
    console.log("User logged out", result);
    // TODO: Add additional redirect logic if needed
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Logout</h1>
      <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
      <Button variant="danger" label="Log Out" onClick={handleLogout} />
    </div>
  );
};

export default LogoutSection;
