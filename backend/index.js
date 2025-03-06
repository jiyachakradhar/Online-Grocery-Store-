const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const UserModel = require("./model/User");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Server setup
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Debugging output
    console.log(`${name} ${email} ${password}`);
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    console.log(existingUser);
    
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new UserModel({ name, email, password: hashedPassword });
    
    // Save the user to the database
    const savedUser = await newUser.save();
    
    // Respond with the saved user
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: error.message });
  }
});
