import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND}/api/v1/product`,
    credentials: "include",
  }),
  tagTypes: ["Products", "Product"], // Tags for list and individual products
  endpoints: (builder) => ({
    // Existing endpoint: Fetch all products
    getProducts: builder.query({
      query: () => ({
        url: "/getAllProducts",
        method: "GET",
      }),
      providesTags: ["Products"], // Tag for product list
    }),
    // Existing endpoint: Fetch a single product by ID
    getProduct: builder.query({
      query: (id) => ({
        url: `/getProduct/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }], // Tag for specific product
    }),
    // Existing endpoint: Create a product with file upload
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/createProduct",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    // Existing endpoint: Update a product with file upload
    updateProduct: builder.mutation({
      query: ({ id, productData }) => {
        const formData = new FormData();
        Object.keys(productData).forEach((key) =>
          formData.append(key, productData[key])
        );
        return {
          url: `/updateProduct/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Product", id },
      ], // Invalidate list and specific product
    }),
    // Existing endpoint: Delete a product by ID
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/deleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"], // Invalidate product list
    }),
    // New endpoint: Create a product with an image URL
    createProductWithImageLink: builder.mutation({
      query: (productData) => ({
        url: "/createProductImageLink",
        method: "POST",
        body: productData, // JSON body with productImage as a URL
      }),
      invalidatesTags: ["Products"], // Invalidate product list
    }),
    // New endpoint: Update a product with an image URL
    updateProductWithImageLink: builder.mutation({
      query: ({ id, productData }) => ({
        url: `/updateProductImageLink/${id}`,
        method: "PUT",
        body: productData, // JSON body with productImage as a URL
      }),
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Product", id },
      ], // Invalidate list and specific product
    }),
    getProductsWithFilter: builder.query({
      query: (productType) => ({
        url: "/getProductWithFilter", // Adjust this to match your backend route
        method: "POST",
        body: { productType }, // Send productType in the request body
      }),
      providesTags: (result, error, productType) => [
        { type: "Products", id: `FILTER_${productType}` }, // Unique tag for filtered results
      ],
    }),
    searchProducts: builder.query({
      query: (productName) => ({
        url: "/searchProducts",
        method: "GET",
        params: { productName },
      }),
      providesTags: ["Products"],
    }),
  }),
});

// Export hooks for all endpoints
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductWithImageLinkMutation,
  useUpdateProductWithImageLinkMutation,
  useGetProductsWithFilterQuery,
  useSearchProductsQuery,
} = productApi;
