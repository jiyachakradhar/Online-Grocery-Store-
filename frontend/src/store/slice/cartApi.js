import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi", // Unique path for this API in the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND}/api/v1/cart`, // Base URL for your cart API
    credentials: "include", // Include cookies if needed for authentication
  }),
  tagTypes: ["Cart"], // Define a "Cart" tag type for cache management
  endpoints: (builder) => ({
    // Query to fetch the cart
    getCart: builder.query({
      query: () => ({
        url: "/getCart",
        method: "GET",
      }),
      providesTags: ["Cart"], // This query provides the "Cart" tag
    }),
    // Mutation to add an item to the cart
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/addToCart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"], // Invalidate "Cart" tag to refetch getCart
    }),
    // Mutation to remove an item from the cart
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "/removeFromCart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"], // Invalidate "Cart" tag to refetch getCart
    }),
    // Mutation to update the cart
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/updateCart",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"], // Invalidate "Cart" tag to refetch getCart
    }),
  }),
});

// Export hooks for use in your components
export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} = cartApi;
