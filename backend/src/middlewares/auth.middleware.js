import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const Auth = AsyncHandler(async (req, res, next) => {
  const Accesstoken = req.cookies.AccessToken;
  if (!Accesstoken) throw new ApiError(400, "No Access token");
  const decode = jwt.decode(Accesstoken, process.env.ACCESS_TOKEN_SECRET_KEY);
  if (!decode) throw new ApiError(400, "Invalid accesstoken");
  const user = await User.findById(decode._id).select(
    "-Password -refreshToken -accessToken"
  );
  if (!user) throw new ApiError(400, "Invalid Access token");
  req.user = user;
  next();
});
