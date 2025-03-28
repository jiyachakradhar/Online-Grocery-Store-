import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the order API
export const orderApi = createApi({
  // Unique key for this API slice in the Redux store
  reducerPath: "orderApi",

  // Base query configuration with authentication headers
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND}/api/v1/order`, // Adjust this if your API base URL differs
    credentials: "include",
  }),

  // Define tag types for cache invalidation
  tagTypes: ["Orders", "Order"],

  // Define API endpoints
  endpoints: (builder) => ({
    // POST /createOrder - Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/createOrder",
        method: "POST",
        body: orderData, // { cartId, address, phoneAddress, paymentMethod }
      }),
      invalidatesTags: ["Orders"], // Refetch all orders after creation
    }),

    // POST /createOrderWithScan - Create an order with scan
    createOrderWithScan: builder.mutation({
      query: (orderData) => ({
        url: "/createOrderWithScan",
        method: "POST",
        body: orderData, // { cartId, address, phoneAddress, paymentMethod, paymentToken }
      }),
      invalidatesTags: ["Orders"], // Refetch all orders after creation
    }),

    // GET /getOrder/:id - Fetch a single order by ID
    getOrder: builder.query({
      query: (id) => `/getOrder/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }], // Tag for specific order
    }),

    // GET /getAllOrders - Fetch all orders
    getAllOrders: builder.query({
      query: () => "/getAllOrders",
      providesTags: ["Orders"], // Tag for the list of orders
    }),

    // DELETE /deleteOrder/:id - Delete an order by ID
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/deleteOrder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"], // Refetch all orders after deletion
    }),
  }),
});

// Export generated hooks for use in React components
export const {
  useCreateOrderMutation,
  useCreateOrderWithScanMutation,
  useGetOrderQuery,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} = orderApi;
