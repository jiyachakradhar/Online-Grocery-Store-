import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Signup.css"; // Import CSS

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = (e) => {
    e.preventDefault();
    // Here you can add any logic you want to handle after form submission
    console.log("User  details:", { name, email, password });
    
    // Navigate to the home page after clicking the signup button
    navigate("/"); // Change this to your home route
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
          placeholder="Enter Name"
          type="text"
          className="signup-input"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
          placeholder="Enter Email"
          type="email"
          className="signup-input"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
          placeholder="Enter Password"
          type="password"
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
    </div>
  );
};