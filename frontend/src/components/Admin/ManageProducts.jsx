// src/components/ManageProducts.js
import React from "react";
import Details from "../cart/Details";
import { useGetProductsQuery } from "../../store/slice/productSlice";

const ManageProducts = ({ onEditProduct, onDeleteProduct }) => {
  // Fetch all products (assuming you have a getProducts endpoint)
  const { data, isLoading, error } = useGetProductsQuery();

  const products = Array.isArray(data) ? data : data?.data[0] || [];

  console.log(products);
  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Manage Products</h2>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Manage Products</h2>
        <p>Error loading products: {error.message}</p>
      </div>
    );
  }

  if (products.length == 0) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Manage Products</h2>
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>

      {/* Display each product using the Detail component */}
      {products?.map((product) => (
        <Details
          key={product._id}
          productId={product._id}
          amount={1} // Example quantity
          onEdit={() => onEditProduct(product)}
          onDelete={() => onDeleteProduct(product._id)}
        />
      ))}
    </div>
  );
};

export default ManageProducts;
