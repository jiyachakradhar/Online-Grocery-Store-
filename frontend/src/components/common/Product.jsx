import React from "react";
import { Link } from "react-router-dom";

const Product = ({
  _id,
  productName,
  productDescription,
  productPrice,
  productImage,
}) => {
  return (
    <Link
      to={`/Product/${_id}`}
      className="w-80 h-60 border bg-white shadow-md rounded-lg overflow-hidden flex flex-col transform transition-transform hover:scale-105 hover:z-10 cursor-pointer"
    >
      {/* Product Image */}
      <img
        src={productImage}
        alt={productName}
        className="w-full h-32 object-cover"
      />
      {/* Product Details */}
      <div className="p-2 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold truncate">{productName}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {productDescription}
        </p>
        <p className="text-md font-bold mt-auto">${productPrice.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default Product;
