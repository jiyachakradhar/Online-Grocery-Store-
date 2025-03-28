import React from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { useUpdatePasswordMutation } from "../../store/slice/userSlice"; // ✅ Import mutation

const PasswordForm = () => {
  const [updatePassword, { isLoading, isError, error, isSuccess }] =
    useUpdatePasswordMutation(); // ✅ RTK Query Mutation Hook

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      reset(); // ✅ Reset form on success
    } catch (err) {
      console.error("❌ Password update failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Old Password</label>
        <input
          type="password"
          {...register("oldPassword", { required: "Old password is required" })}
          placeholder="Enter old password"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.oldPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Enter new password"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
          placeholder="Confirm new password"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* ✅ Display API response messages */}
      {isSuccess && (
        <p className="text-green-500 text-sm">
          ✅ Password updated successfully
        </p>
      )}
      {isError && (
        <p className="text-red-500 text-sm">
          ❌ {error?.data?.message || "Failed to update password"}
        </p>
      )}

      <Button
        variant="primary"
        label={isLoading ? "Updating..." : "Change Password"} // ✅ Disable while loading
        type="submit"
        disabled={isLoading} // ✅ Prevent double clicks
      />
    </form>
  );
};

export default PasswordForm;
