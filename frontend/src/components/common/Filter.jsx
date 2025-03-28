import React from "react";
import Button from "./Button"; // Adjust the import path based on your project structure
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

const Filter = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { slug: "produce", element: "Produce", icon: <FaLeaf /> },
    { slug: "meat-seafood", element: "Meat & Seafood", icon: <FaFish /> },
    { slug: "dairy", element: "Dairy", icon: <FaCheese /> },
    { slug: "bakery", element: "Bakery", icon: <FaBreadSlice /> },
    { slug: "frozen", element: "Frozen", icon: <FaSnowflake /> },
    { slug: "grocery", element: "Grocery", icon: <FaShoppingBag /> },
    { slug: "wine-spirits", element: "Wine & Spirits", icon: <FaWineGlass /> },
    {
      slug: "tea-coffee-beverage",
      element: "Tea, Coffee & Beverage",
      icon: <FaCoffee />,
    },
  ];

  // Handle filter selection (toggle on click)
  const handleFilterClick = (slug) => {
    setActiveFilter((prev) => (prev === slug ? null : slug));
  };

  return (
    <nav className="rounded-lg">
      <ul className="flex flex-wrap gap-2 justify-start">
        {filters.map((filter) => (
          <li key={filter.slug} className="flex items-center">
            <Button
              variant={activeFilter === filter.slug ? "active" : "secondary"}
              label={filter.element}
              icon={filter.icon}
              onClick={() => handleFilterClick(filter.slug)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Filter;
