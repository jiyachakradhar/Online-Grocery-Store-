import React from "react";
import { useForm } from "react-hook-form";
import { useUpdateEmailMutation } from "../../store/slice/userSlice"; // ✅ Import API mutation
import Button from "../common/Button";

const EmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [updateEmail, { isLoading }] = useUpdateEmailMutation(); // ✅ RTK Mutation Hook

  const onSubmit = async (data) => {
    try {
      await updateEmail({ Email: data.email }).unwrap(); // ✅ Trigger API call
      console.log("Email updated successfully!");
      reset();
    } catch (error) {
      console.error("Failed to update email:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="Enter new email"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <Button
        variant="primary"
        label={isLoading ? "Updating..." : "Update Email"} // ✅ Show loading state
        type="submit"
        disabled={isLoading} // ✅ Disable while loading
      />
    </form>
  );
};

export default EmailForm;
