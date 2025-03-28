import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";

const createOrder = AsyncHandler(async (req, res) => {
  const { cartId, address, phoneAddress, paymentMethod } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(400, "User not found");
  const cart = await Cart.findById(cartId);
  if (!cart) throw new ApiError(400, "Cart not found");
  let total = 0;
  cart.products.forEach((product) => {
    total += product.price * product.amount;
  });
  const newOrder = await Order.create({
    cartId: cart._id,
    customerId: user._id,
    totalPrice: total,
    address: address,
    phoneNumber: phoneAddress,
    paymentMethod: paymentMethod,
  });
  if (!newOrder) throw new ApiError(500, "Something went wrong");
  res.status(200).json(new ApiResponse(200, [newOrder], "Order created"));
});

const createOrderWithScan = AsyncHandler(async (req, res) => {
  const { cartId, address, phoneAddress, paymentMethod, paymentToken } =
    req.body;
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(400, "User not found");
  const cart = await Cart.findById(cartId);
  if (!cart) throw new ApiError(400, "Cart not found");
  let total = 0;
  cart.products.forEach((product) => {
    total += product.price * product.amount;
  });
  const newOrder = await Order.create({
    cartId: cart._id,
    customerId: user._id,
    totalPrice: total,
    address: address,
    phoneNumber: phoneAddress,
    paymentMethod: paymentMethod,
    paymentToken: paymentToken,
  });
  if (!newOrder) throw new ApiError(500, "Something went wrong");
  res.status(200).json(new ApiResponse(200, [newOrder], "Order created"));
});

const getOrder = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Order id not found");
  const order = await Order.findById(id);
  if (!order) throw new ApiError(400, "Order not found");
  res.status(200).json(new ApiResponse(200, [order], "Order found"));
});

const getAllOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find();
  if (!orders) throw new ApiError(500, "Something went wrong");
  res.status(200).json(new ApiResponse(200, [orders], "Orders found"));
});

const deleteOrder = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Order id not found");
  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new ApiError(500, "Something went wrong");
  res.status(200).json(new ApiResponse(200, [order], "Order deleted"));
});

export {
  createOrder,
  createOrderWithScan,
  getOrder,
  getAllOrders,
  deleteOrder,
};
