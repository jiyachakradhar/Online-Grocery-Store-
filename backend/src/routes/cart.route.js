import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart.controller.js";
import { Auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addToCart").post(Auth, addToCart);
router.route("/getCart").get(Auth, getCart);
router.route("/removeFromCart").post(Auth, removeFromCart);
router.route("/updateCart").put(Auth, updateCart);

export default router;
