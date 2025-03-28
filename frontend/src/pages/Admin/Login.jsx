import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/feature/admin";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedin = useSelector((state) => state.admin.loggedIn);

  const onSubmit = (data) => {
    dispatch(login(data)); // Dispatch action
    reset();
  };

  // 🚀 Fix: Navigate when `loggedin` state updates
  useEffect(() => {
    if (loggedin) {
      navigate("/admin/dashboard");
    }
  }, [loggedin, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            variant="primary"
            label="Login"
            type="submit"
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
