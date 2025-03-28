import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import {
  useCreateProductMutation,
  useCreateProductWithImageLinkMutation,
} from "../../store/slice/productSlice";

const AddProduct = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Initialize the two API mutation hooks
  const [
    createProduct,
    { isLoading: isCreatingWithFile, error: createErrorWithFile },
  ] = useCreateProductMutation();
  const [
    createProductWithImageLink,
    { isLoading: isCreatingWithUrl, error: createErrorWithUrl },
  ] = useCreateProductWithImageLinkMutation();

  // Watch both the URL field and file input
  const productImageUrl = watch("productImage");
  const productImageFile = watch("productImageFile");

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Base product data
      const productData = {
        productName: data.productName,
        productDescription: data.productDescription,
        productPrice: data.productPrice,
        productType: data.productType,
      };

      if (data.productImageFile && data.productImageFile.length > 0) {
        // Case 1: File upload - Use createProduct with FormData
        const formData = new FormData();
        formData.append("productImage", productImageFile[0]); // Append the file
        Object.keys(productData).forEach((key) =>
          formData.append(key, productData[key])
        );
        console.log(formData);
        await createProduct(formData).unwrap();
        console.log("Product created with file upload");
      } else if (data.productImage) {
        // Case 2: Image URL - Use createProductWithImageLink with JSON
        productData.productImage = data.productImage;
        await createProductWithImageLink(productData).unwrap();
        console.log("Product created with image URL");
      } else {
        throw new Error("Please provide either an image URL or upload a file.");
      }
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  // Create a preview when user selects a file or updates the image URL
  useEffect(() => {
    if (productImageFile && productImageFile.length > 0) {
      const file = productImageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else if (productImageUrl) {
      setPreviewImage(productImageUrl);
    } else {
      setPreviewImage(null);
    }
  }, [productImageFile, productImageUrl]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            {...register("productName", {
              required: "Product Name is required",
            })}
            placeholder="Enter product name"
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
            placeholder="Enter product description"
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
            placeholder="Enter product price"
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
            placeholder="Enter product image URL"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can either provide an image URL or upload a file below.
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
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Choose a local image to upload (optional).
          </p>
        </div>

        {/* Product Type (Dropdown) */}
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

        {/* Preview of selected/URL image */}
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

        {/* Submit Button with Loading State */}
        <Button
          variant="primary"
          label={
            isCreatingWithFile || isCreatingWithUrl
              ? "Adding Product..."
              : "Add Product"
          }
          type="submit"
          disabled={isCreatingWithFile || isCreatingWithUrl}
        />

        {/* Error Display */}
        {(createErrorWithFile || createErrorWithUrl) && (
          <p className="text-red-500 text-sm mt-2">
            {createErrorWithFile?.data?.message ||
              createErrorWithUrl?.data?.message ||
              "Failed to create product"}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
