import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUsername,
  updatePassword,
  updateEmail,
  checkUser,
  getUser,
} from "../controllers/user.controller.js";
import { Auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(Auth, logoutUser);
router.route("/updateUsername").put(Auth, updateUsername);
router.route("/updatePassword").put(Auth, updatePassword);
router.route("/updateEmail").put(Auth, updateEmail);
router.route("/getUser").get(Auth, getUser);
router.route("/checkUser").get(checkUser);

export default router;
