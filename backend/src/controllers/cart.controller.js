import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const addToCart = AsyncHandler(async (req, res) => {
  const { productId, amount } = req.body;
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(400, "Product not found");
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(400, "User not found");

  const cart = await Cart.findOne({ customerId: user._id }); // Changed UserId to customerId to match create

  if (!cart) {
    const newCart = await Cart.create({
      customerId: user._id,
      products: [
        {
          product: productId,
          amount,
        },
      ],
    });
    if (!newCart) throw new ApiError(500, "Something went wrong");
    res.status(200).json(new ApiResponse(200, [newCart], "Cart created"));
    return;
  }

  // Check if product exists in cart
  const productExists = cart.products.some(
    (item) => item.product.toString() === productId.toString()
  );

  let updatedCart;
  if (productExists) {
    // Update existing product's amount
    updatedCart = await Cart.findOneAndUpdate(
      {
        customerId: user._id,
        "products.product": productId,
      },
      {
        $set: {
          "products.$.amount":
            cart.products.find(
              (item) => item.product.toString() === productId.toString()
            ).amount + amount,
        },
      },
      { new: true }
    );
  } else {
    // Add new product
    updatedCart = await Cart.findOneAndUpdate(
      { customerId: user._id },
      {
        $push: {
          products: {
            product: productId,
            amount,
          },
        },
      },
      { new: true }
    );
  }

  if (!updatedCart) throw new ApiError(500, "Something went wrong");
  res.status(200).json(new ApiResponse(200, [updatedCart], "Cart updated"));
});

const getCart = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) res.status(200).json(new ApiResponse(200, [], "Cart not found"));
  const cart = await Cart.findOne({ customerId: user._id }).populate(
    "products.product"
  );
  if (cart == null) {
    return res.status(200).json(new ApiResponse(200, [], "Cart not found"));
  }
  let totalAmount = 0;
  cart.products.forEach((product) => {
    totalAmount += product.amount * product.product.productPrice;
  });
  cart.totalAmount = totalAmount;
  await cart.save();
  if (!cart) throw new ApiError(400, "Cart not found");
  res.status(200).json(new ApiResponse(200, [cart], "Cart found"));
});

const removeFromCart = AsyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, `Invalid product ID: ${productId}`);
  }

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(400, "User not found");

  const cart = await Cart.findOne({ customerId: user._id });
  if (!cart) throw new ApiError(400, "Cart not found");

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex === -1) {
    throw new ApiError(404, "Product not found in cart");
  }

  cart.products.splice(productIndex, 1);
  cart.totalAmount = cart.products.reduce((sum, item) => sum + item.amount, 0);

  await cart.save();

  const updatedCart = await Cart.findOne({ customerId: user._id }).populate(
    "products.product"
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Item removed from cart"));
});

const updateCart = AsyncHandler(async (req, res) => {});

export { addToCart, getCart, removeFromCart, updateCart };
