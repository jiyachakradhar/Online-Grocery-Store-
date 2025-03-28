import React from "react";
import { MdDelete } from "react-icons/md";
import Button from "../common/Button";
import { useRemoveFromCartMutation } from "../../store/slice/cartApi"; // ✅ Import remove mutation

const Detail = ({
  productId,
  productImage,
  productName,
  productPrice,
  amount,
}) => {
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation(); // ✅ RTK Mutation Hook
  const handleRemove = async () => {
    try {
      await removeFromCart({ productId }).unwrap(); // ✅ Trigger API Call
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <section className="w-full shadow-sm border-b p-2 flex items-center justify-between">
      <main className="flex items-center gap-2">
        <img
          src={productImage}
          alt={productName}
          className="w-14 h-14 object-cover"
        />
        <article className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">{productName}</h3>
          <p className="text-sm text-gray-600">Qty: {amount}</p>
        </article>
      </main>
      <section className="flex gap-2 items-center">
        <Button
          variant="secondary"
          label={isLoading ? "Removing..." : "Remove"} // ✅ Disable while loading
          icon={<MdDelete />}
          onClick={handleRemove} // ✅ Attach remove handler
          disabled={isLoading} // ✅ Prevent double clicks
        />
        <p className="text-sm text-gray-600">
          ${productPrice.toFixed(2)} per Piece
        </p>
      </section>
    </section>
  );
};

export default Detail;
