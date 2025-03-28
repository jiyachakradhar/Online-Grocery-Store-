// src/components/EditProduct.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import {
  useUpdateProductMutation,
  useUpdateProductWithImageLinkMutation,
} from "../../store/slice/productSlice";

const EditProduct = ({ product }) => {
  // State for image preview, initialized with the current product image
  const [previewImage, setPreviewImage] = useState(product.productImage);

  // Set up react-hook-form with default values from the product prop
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productImage: product.productImage, // Existing image URL
      productType: product.productType,
    },
  });

  // Watch the image URL and file input fields
  const productImageUrl = watch("productImage");
  const productImageFile = watch("productImageFile");

  // RTK Query mutation hooks for updating the product
  const [
    updateProduct,
    { isLoading: isUpdatingWithFile, error: updateErrorWithFile },
  ] = useUpdateProductMutation();
  const [
    updateProductWithImageLink,
    { isLoading: isUpdatingWithUrl, error: updateErrorWithUrl },
  ] = useUpdateProductWithImageLinkMutation();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Base product data object
      const productData = {
        productName: data.productName,
        productDescription: data.productDescription,
        productPrice: data.productPrice,
        productType: data.productType,
      };

      if (data.productImageFile && data.productImageFile.length > 0) {
        // Case 1: File upload - Use updateProduct with FormData
        const formData = new FormData();
        formData.append("productImage", data.productImageFile[0]); // Append the new file
        Object.keys(productData).forEach((key) =>
          formData.append(key, productData[key])
        );
        await updateProduct({
          id: product._id,
          productData: formData,
        }).unwrap();
        console.log("Product updated with file upload");
      } else {
        // Case 2: Image URL - Use updateProductWithImageLink with JSON
        productData.productImage = data.productImage || product.productImage; // Fallback to existing image if empty
        await updateProductWithImageLink({
          id: product._id,
          productData,
        }).unwrap();
        console.log("Product updated with image URL");
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Update image preview when the URL or file changes
  useEffect(() => {
    if (productImageFile && productImageFile.length > 0) {
      const file = productImageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else if (productImageUrl) {
      setPreviewImage(productImageUrl);
    } else {
      setPreviewImage(product.productImage); // Revert to original if both are empty
    }
  }, [productImageFile, productImageUrl, product.productImage]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            {...register("productName", {
              required: "Product Name is required",
            })}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Description
          </label>
          <textarea
            {...register("productDescription")}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register("productPrice", {
              required: "Product Price is required",
            })}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.productPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productPrice.message}
            </p>
          )}
        </div>

        {/* Product Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Image URL
          </label>
          <input
            type="text"
            {...register("productImage")}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.productImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productImage.message}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Update the URL or upload a new file below (leave unchanged to keep
            current image).
          </p>
        </div>

        {/* Product Image File */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Image File
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("productImageFile")}
            className="w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload a new image to replace the current one (optional).
          </p>
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Type</label>
          <select
            {...register("productType", {
              required: "Product Type is required",
            })}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a product type</option>
            <option value="produce">Produce</option>
            <option value="meat-seafood">Meat & Seafood</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="frozen">Frozen</option>
            <option value="grocery">Grocery</option>
            <option value="wine-spirits">Wine & Spirits</option>
            <option value="tea-coffee-beverage">Tea, Coffee & Beverage</option>
          </select>
          {errors.productType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productType.message}
            </p>
          )}
        </div>

        {/* Image Preview */}
        {previewImage && (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-1">Image Preview:</p>
            <img
              src={previewImage}
              alt="Product Preview"
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}

        {/* Submit Button */}
        <Button
          variant="primary"
          label={
            isUpdatingWithFile || isUpdatingWithUrl
              ? "Updating Product..."
              : "Update Product"
          }
          type="submit"
          disabled={isUpdatingWithFile || isUpdatingWithUrl}
        />

        {/* Error Display */}
        {(updateErrorWithFile || updateErrorWithUrl) && (
          <p className="text-red-500 text-sm mt-2">
            {updateErrorWithFile?.data?.message ||
              updateErrorWithUrl?.data?.message ||
              "Failed to update product"}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProduct;
