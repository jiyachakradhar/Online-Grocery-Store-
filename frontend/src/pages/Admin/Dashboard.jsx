// src/pages/AdminDashboard.js
import React, { useState } from "react";
import Button from "../../components/common/Button";

import ManageProducts from "../../components/Admin/ManageProducts";
import AddProduct from "../../components/Admin/AddProducts";
import EditProduct from "../../components/Admin/EditProduct";
import ManageOrders from "../../components/Admin/ManageOrders";
import { useDeleteProductMutation } from "../../store/slice/productSlice";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handle Edit button click from ManageProducts
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setActiveSection("editProduct");
  };
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Handle Delete button click from ManageProducts
  const handleDeleteProduct = async (productId) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        console.log(productId);
        await deleteProduct(productId).unwrap();
        console.log("Successfully deleted product with id:", productId);
        // The product list will automatically refresh due to invalidatesTags
      }
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="flex gap-2">
      {/* Sidebar Navigation */}
      <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md min-h-[272px] max-h-[350px]">
        <h2 className="text-lg font-semibold mb-3">Admin Dashboard</h2>

        <Button
          variant={activeSection === "dashboard" ? "active" : "secondary"}
          label="Dashboard"
          onClick={() => setActiveSection("dashboard")}
          className="mb-2 w-full"
        />
        <Button
          variant={activeSection === "manageProducts" ? "active" : "secondary"}
          label="Manage Products"
          onClick={() => setActiveSection("manageProducts")}
          className="mb-2 w-full"
        />
        <Button
          variant={activeSection === "addProduct" ? "active" : "secondary"}
          label="Add Product"
          onClick={() => setActiveSection("addProduct")}
          className="mb-2 w-full"
        />
        <Button
          variant={activeSection === "manageOrders" ? "active" : "secondary"}
          label="Manage Orders"
          onClick={() => setActiveSection("manageOrders")}
          className="mb-2 w-full"
        />

        {/* You can add more sidebar items here if needed */}
      </aside>

      {/* Main Content */}
      <main className="w-3/4 bg-white p-6 rounded-lg shadow-md min-h-full max-h-screen overflow-y-auto">
        {activeSection === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
          </div>
        )}

        {activeSection === "manageProducts" && (
          <ManageProducts
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeSection === "addProduct" && <AddProduct />}

        {activeSection === "editProduct" && selectedProduct && (
          <EditProduct product={selectedProduct} />
        )}

        {activeSection === "manageOrders" && <ManageOrders />}
      </main>
    </div>
  );
};

export default Dashboard;
