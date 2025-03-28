import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const createProduct = AsyncHandler(async (req, res) => {
  const { productName, productDescription, productPrice, productType } =
    req.body;
  const path = req.file?.path;
  if (!path) throw new ApiError(400, "No image uploaded");
  if (
    [productName, productDescription, productPrice, productType].some(
      (field) => field.trim() == ""
    )
  ) {
    fs.unlinkSync(path);
    throw new ApiError(400, "All field must be field");
  }
  const image = await uploadOnCloudinary(path);
  if (!image)
    throw new ApiError(500, "Something went wrong while uploading image");
  const product = await Product.create({
    productName,
    productDescription,
    productPrice,
    productType,
    productImage: image.url,
  });
  if (!product)
    throw new ApiError(500, "Something went wrong while creating product");
  res.status(200).json(new ApiResponse(200, [product], "Product created"));
});

const getAllProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products)
    res.status(200).json(new ApiResponse(200, [], "Products not found"));
  res.status(200).json(new ApiResponse(200, [products], "Products found"));
});

const deleteProduct = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Product id not found");

  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, "Product not found");

  const deleter = await deleteOnCloudinary(product.productImage);
  if (!deleter || deleter.result !== "ok") {
    // Roll back deletion if Cloudinary fails (optional)
    // For now, just throw an error
    throw new ApiError(500, "Failed to delete product image from Cloudinary");
  }

  res.status(200).json(new ApiResponse(200, [product], "Product deleted"));
});

const updateProduct = AsyncHandler(async (req, res) => {
  const { productName, productDescription, productPrice, productType } =
    req.body;
  const path = req.file?.path;
  if (!path) throw new ApiError(400, "No image uploaded");
  if (
    [productName, productDescription, productPrice, productType].some(
      (field) => field.trim() == ""
    )
  ) {
    fs.unlinkSync(path);
    throw new ApiError(400, "All field must be field");
  }
  const image = await uploadOnCloudinary(path);
  if (!image)
    throw new ApiError(500, "Something went wrong while uploading picture");
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(500, "Product not found");
  const deleted = await deleteOnCloudinary(product.productImage);
  if (!deleted) throw new ApiError(500, "Something went wrong while deleting");
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      productName,
      productDescription,
      productPrice,
      productType,
      productImage: image.url,
    },
    { new: true }
  );
  if (!updatedProduct)
    throw new ApiError(500, "Something went wrong while updating product");
  const deleter = await deleteOnCloudinary(product.productImage);
  if (!deleter) throw new ApiError(500, "Something went wrong while deleting");
  res
    .status(200)
    .json(new ApiResponse(200, [updatedProduct], "Product updated"));
});

const getProductWithFilter = AsyncHandler(async (req, res) => {
  const { productType } = req.body;
  if (!productType) throw new ApiError(400, "Product type not found");
  const products = await Product.find({ productType });
  if (!products)
    throw new ApiError(500, "Something went wrong while fetching products");
  res
    .status(200)
    .json(new ApiResponse(200, [products], "Products found with filter"));
});

const updateProductImageLink = AsyncHandler(async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productType,
    productImage,
  } = req.body;
  console.log(req.params.id);
  if (
    [productName, productDescription, productPrice, productType].some(
      (field) => field == undefined
    )
  )
    throw new ApiError(400, "All field must be field");
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(500, "Product not found");
  let image;
  if (!(product.productImage === productImage)) {
    image = await uploadOnCloudinary(productImage);
    if (!image)
      throw new ApiError(500, "Something went wrong while uploading picture");
    const deleter = await deleteOnCloudinary(product.productImage);
    if (!deleter)
      throw new ApiError(500, "Something went wrong while deleting");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      productName,
      productDescription,
      productPrice,
      productType,
      productImage: image?.url || productImage,
    },
    { new: true }
  );
  if (!updatedProduct)
    throw new ApiError(500, "Something went wrong while updating product");
  res
    .status(200)
    .json(new ApiResponse(200, [updatedProduct], "Product updated"));
});

const createProductImageLink = AsyncHandler(async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productType,
    productImage,
  } = req.body;
  if (
    [productName, productDescription, productPrice, productType].some(
      (field) => field.trim() == ""
    )
  )
    throw new ApiError(400, "All field must be field");
  const product = await Product.create({
    productName,
    productDescription,
    productPrice,
    productType,
    productImage,
  });
  if (!product)
    throw new ApiError(500, "Something went wrong while creating product");
  res.status(200).json(new ApiResponse(200, [product], "Product created"));
});

const getProduct = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Product id not found");
  const product = await Product.findById(id);
  if (!product) throw new ApiError(400, "Product not found");
  res.status(200).json(new ApiResponse(200, [product], "Product found"));
});

const getProducts = AsyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  if ([page, limit].some((field) => field.trim() == ""))
    throw new ApiError(400, "All field must be field");
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const skip = (page - 1) * 10;
  const products = await Product.find().skip(skip).limit(limit);
  const total = await Product.countDocuments();
  if (!products)
    throw new ApiError(500, "Something went wrong while fetching products");
  res
    .status(200)
    .json(new ApiResponse(200, [products, total], "Products found"));
});

const searchProducts = async (req, res) => {
  const { productName } = req.query;
  if (!productName) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "Product name not found"));
  }

  const products = await Product.find({
    productName: { $regex: productName, $options: "i" }, // Case-insensitive partial match
  });

  res.status(200).json(new ApiResponse(200, [products], "Products found"));
};

export {
  createProduct,
  createProductImageLink,
  getAllProducts,
  deleteProduct,
  updateProduct,
  updateProductImageLink,
  getProduct,
  getProductWithFilter,
  searchProducts,
};
