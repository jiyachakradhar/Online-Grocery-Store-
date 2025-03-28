import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/feature/user"; // Redux action to set logged-in state
import { login as log } from "../../store/feature/admin";
import Button from "../common/Button";
import { useLoginUserMutation } from "../../store/slice/userSlice"; // API mutation hook
import { useNavigate } from "react-router-dom";

const LoginForm = ({ isOpen, toggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [loginUser, { isLoading, error }] = useLoginUserMutation(); // Destructure mutation hook
  const adminLogin = useSelector((state) => state.admin.loggedIn);
  const navigate = useNavigate();
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      dispatch(log(data)); // Dispatch action to set logged-in state
      if (adminLogin) {
        navigate("/admin/dashboard");
        toggle();
      }
      const credentials = {
        Username: data.username,
        Password: data.password,
      };
      const result = await loginUser(credentials).unwrap();
      dispatch(login()); // Update Redux state to mark user as logged in
      toggle(); // Close the modal on success
    } catch (err) {
      console.error("Login Failed:", err);
      // Error is also available via the 'error' variable from the hook
    }
  };
  useEffect(() => {
    if (error) {
      console.error("Login Failed:", error);
    }
  }, [adminLogin]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg relative p-6">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={toggle}
        >
          <RxCross1 size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
          {/* Display API error if any */}
          {error && (
            <p className="text-red-500 text-sm">
              {error.data?.message || "Login failed. Please try again."}
            </p>
          )}
          {/* Submit Button */}
          <Button
            variant="primary"
            label={isLoading ? "Logging in..." : "Login"} // Show loading state
            type="submit"
            disabled={isLoading} // Disable button during loading
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
