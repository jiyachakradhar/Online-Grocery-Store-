import React from "react";
import {
  FaLeaf,
  FaFish,
  FaCheese,
  FaBreadSlice,
  FaSnowflake,
  FaShoppingBag,
  FaWineGlass,
  FaCoffee,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const Button = ({
  variant = "primary", // Default variant
  label,
  icon,
  type = "button", // Default button type
  onClick,
  disabled = false,
  className = "",
}) => {
  // Map of variants to Tailwind classes
  const variantStyles = {
    primary:
      "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed",
    secondary:
      "px-4 py-2 bg-white text-gray-800 font-medium rounded-full border border-gray-300 hover:bg-gray-200 transition disabled:bg-gray-200 disabled:cursor-not-allowed",
    active:
      "px-4 py-2 bg-blue-500 text-white border border-blue-500 font-medium rounded-full transition disabled:bg-gray-400 disabled:cursor-not-allowed",
    danger:
      "w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed",
  };
  // Icon mapping for filter variants (if needed)
  const iconMap = {
    produce: <FaLeaf />,
    "meat-seafood": <FaFish />,
    dairy: <FaCheese />,
    bakery: <FaBreadSlice />,
    frozen: <FaSnowflake />,
    grocery: <FaShoppingBag />,
    "wine-spirits": <FaWineGlass />,
    "tea-coffee-beverage": <FaCoffee />,
    delete: <MdDelete />,
    edit: <MdEdit />,
  };

  // Determine the icon to use (either passed as prop or from iconMap based on label)
  const renderIcon =
    icon ||
    (label &&
      iconMap[label.toLowerCase().replace(" & ", "-").replace(", ", "-")]) ||
    null;

  // Base classes for all buttons
  const baseClasses =
    "flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Combine base classes, variant classes, and custom classes
  const buttonClasses =
    `${baseClasses} ${variantStyles[variant]} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {renderIcon && <span className="mr-2">{renderIcon}</span>}
      {label}
    </button>
  );
};

export default Button;
