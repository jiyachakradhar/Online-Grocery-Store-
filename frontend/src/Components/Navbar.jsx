import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Easy Basket</div>
      <div className="navbar-links">
        <Link to="/signup" className="navbar-btn signup-btn">Signup</Link>
        <Link to="/login" className="navbar-btn login-btn">Login</Link>
      </div>
    </nav>
  );
};