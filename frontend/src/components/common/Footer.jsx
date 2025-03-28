import React from "react";
import { FaShoppingBasket } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-4">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand & Contact Info */}
        <div>
          <div className="flex items-center mb-3">
            <FaShoppingBasket className="text-green-600 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-green-600">Easy Basket</h2>
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Address:</span>{" "}
            Bhimsengola,Kathmandu Nepal
            <br />
            Kathmandu
          </p>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">Phone:</span> +977 984-5768611
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Email:</span> info@initappz.com
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Useful Links
          </h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Home</li>
            <li>Orders</li>
            <li>Cart</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300" />

      {/* Copyright */}
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} jiya chakradhar. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
