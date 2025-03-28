// src/components/UsernameForm.js
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { useUpdateUsernameMutation } from "../../store/slice/userSlice"; // Adjust based on your actual API service

const UsernameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateUsername, { isLoading, isError, error }] =
    useUpdateUsernameMutation();

  const onSubmit = async (data) => {
    try {
      await updateUsername({ Username: data.username }).unwrap();
      console.log("Updated Username:", data.username);
    } catch (err) {
      console.error("Error updating username:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
          placeholder="Enter new username"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>
      {isError && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      <Button
        variant="primary"
        label={isLoading ? "Updating..." : "Update Username"}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};

export default UsernameForm;
