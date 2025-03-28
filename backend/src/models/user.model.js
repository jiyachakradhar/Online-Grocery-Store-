import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    Username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    Email: {
      type: String,
      unique: true,
    },
    Password: {
      type: String,
      required: [true, "Password is requred"],
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  this.Password = await bcrypt.hash(this.Password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (Password) {
  return await bcrypt.compare(Password, this.Password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.Username,
      Email: this.Email,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};
userSchema.methods.generateRefreashToken = async function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFREASH_SECRETKEY,
    {
      expiresIn: process.env.REFREASH_EXPIRE,
    }
  );
};
export const User = mongoose.model("User", userSchema);
