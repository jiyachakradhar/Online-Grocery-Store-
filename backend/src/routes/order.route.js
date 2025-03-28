import { Router } from "express";
import {
  createOrder,
  createOrderWithScan,
  getOrder,
  getAllOrders,
  deleteOrder,
} from "../controllers/order.controller.js";
import { Auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createOrder").post(Auth, createOrder);
router.route("/createOrderWithScan").post(Auth, createOrderWithScan);
router.route("/getOrder/:id").get(Auth, getOrder);
router.route("/getAllOrders").get(Auth, getAllOrders);
router.route("/deleteOrder/:id").delete(Auth, deleteOrder);

export default router;
