// src/components/Detail.js
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Button from "../common/Button";
import { useGetProductQuery } from "../../store/slice/productSlice";

const Details = ({ productId, amount = 1, onEdit, onDelete }) => {
  const { data, isLoading, error } = useGetProductQuery(productId);

  const product = data?.data && data.data.length ? data.data[0] : null;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="w-full shadow-sm border-b p-2 flex items-center justify-between">
      {/* Product Image & Basic Info */}
      <main className="flex items-center gap-2">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-14 h-14 object-cover"
        />
        <article className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">{product.productName}</h3>
          <p className="text-sm text-gray-600">Qty: {amount}</p>
        </article>
      </main>

      {/* Edit / Remove / Price */}
      <section className="flex gap-2 items-center">
        {/* Only show Edit/Delete buttons if callbacks are passed in */}
        {onEdit && (
          <Button
            variant="secondary"
            label="Edit"
            icon={<MdEdit />}
            onClick={onEdit}
          />
        )}
        {onDelete && (
          <Button
            variant="secondary"
            label="Remove"
            icon={<MdDelete />}
            onClick={onDelete}
          />
        )}
        <p className="text-sm text-gray-600">
          ${product.productPrice.toFixed(2)} per Piece
        </p>
      </section>
    </section>
  );
};

export default Details;
