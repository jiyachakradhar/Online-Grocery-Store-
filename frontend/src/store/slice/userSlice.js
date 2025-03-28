import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND}/api/v1/user`,
    credentials: "include",
  }),
  tagTypes: ["User"], // Define a tag for user data
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    updateUsername: builder.mutation({
      query: (data) => ({
        url: "/updateUsername",
        method: "PUT",
        body: { Username: data.Username },
      }),
      invalidatesTags: ["User"], // Invalidate user cache
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/updatePassword",
        method: "PUT",
        body: { oldPassword: data.oldPassword, newPassword: data.newPassword },
      }),
      invalidatesTags: ["User"], // Invalidate user cache
    }),
    updateEmail: builder.mutation({
      query: (data) => ({
        url: "/updateEmail",
        method: "PUT",
        body: { Email: data.Email },
      }),
      invalidatesTags: ["User"], // Invalidate user cache
    }),
    getUser: builder.query({
      query: () => ({
        url: "/getUser",
        method: "GET",
      }),
      providesTags: ["User"], // Provide tag for caching
    }),
    checkUser: builder.query({
      query: () => ({
        url: "/checkUser",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdateUsernameMutation,
  useUpdatePasswordMutation,
  useUpdateEmailMutation,
  useGetUserQuery,
  useCheckUserQuery,
} = userApi;
