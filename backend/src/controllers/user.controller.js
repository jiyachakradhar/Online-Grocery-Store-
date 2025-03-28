import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = AsyncHandler(async (req, res) => {
  const { Username, Email, Password } = req.body;
  console.log(req.body);
  if ([Username, Email, Password].some((field) => field.trim() == ""))
    throw new ApiError(400, "All field must be field");
  const userExist = await User.findOne({
    Username: { $regex: `^${Username}$`, $options: "i" },
  });
  if (userExist) throw new ApiError(400, "The user already exist");
  const user = await User.create({
    Username: Username,
    Email: Email,
    Password: Password,
  });
  const createdUser = await User.findById(user._id).select("-Password");
  if (!createdUser)
    throw new ApiError(500, "Something ewnt wrong while registring user");
  const accessToken = await createdUser.generateAccessToken();
  const refreshToken = await createdUser.generateRefreashToken();
  user.accessToken = accessToken;
  user.refreshToken = refreshToken;
  await user.save();
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(new ApiResponse(201, [createdUser], "User created succesfully"));
});

const loginUser = AsyncHandler(async (req, res) => {
  const { Username, Password } = req.body;
  if ([Username, Password].some((field) => field.trim() == ""))
    throw new ApiError(400, "Username or Password Not entered");
  const user = await User.findOne({ Username });
  if (!user) throw new ApiError(400, "User does not exist");
  const isPassword = await user.isPasswordCorrect(Password);
  if (!isPassword) throw new ApiError(400, "Password doesnot match");
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreashToken();
  user.accessToken = accessToken;
  user.refreshToken = refreshToken;
  await user.save();
  const loggedUser = await User.findById(user._id).select(
    "-Password -refreshToken -accessToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(new ApiResponse(201, [loggedUser], "User logged in succesfully"));
});

const logoutUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(400, "User Not Found");
  user.accessToken = null;
  user.refreshToken = null;
  await user.save();
  res
    .status(200)
    .clearCookie("AccessToken")
    .clearCookie("RefreshToken")
    .json(new ApiResponse(200, [], "User Succesfully Logged out"));
});

const updateUsername = AsyncHandler(async (req, res) => {
  const { Username } = req.body;
  const existingUser = await User.findOne({ Username });
  if (existingUser) throw new ApiError(400, "Username Already Taken");
  req.user.Username = Username;
  await req.user.save();
  res
    .status(200)
    .json(new ApiResponse(200, [req.user], "Username updated succesfully"));
});

const updateEmail = AsyncHandler(async (req, res) => {
  const { Email } = req.body;
  console.log("Hello", Email);
  const existingUser = await User.findOne({
    Email: { $regex: `^${Email}$`, $options: "i" },
  });
  if (existingUser) {
    throw new ApiError(400, "Email Already Taken");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { Email },
    { new: true }
  );
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        [{ Email: user.Email }],
        "Email updated successfully"
      )
    );
});

const updatePassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(400, "User not found");
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) throw new ApiError(400, "Password does not match");
  user.Password = newPassword;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, [], "Password updated successfully"));
});

const getUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-Password -refreshToken -accessToken"
  );
  if (!user) throw new ApiError(400, "User Not Found");
  res.status(200).json(new ApiResponse(200, [user], "User Found"));
});

const checkUser = AsyncHandler(async (req, res) => {
  const Accesstoken = req.cookies.AccessToken;
  if (!Accesstoken)
    res.status(200).json(new ApiResponse(200, [], "User Not Found"));
  const decode = jwt.decode(Accesstoken, process.env.ACCESS_TOKEN_SECRET_KEY);
  if (!decode) res.status(200).json(new ApiResponse(200, [], "User Not Found"));
  const user = await User.findById(decode._id).select(
    "-Password -refreshToken -accessToken"
  );
  if (!user) res.status(200).json(ApiResponse(200, [], "User Not Found"));
  res.status(200).json(new ApiResponse(200, [user], "User Found"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  updateEmail,
  updatePassword,
  updateUsername,
  getUser,
  checkUser,
};
