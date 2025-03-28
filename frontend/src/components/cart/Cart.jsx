import React, { useState } from "react";
import Counter from "./counter";
import Button from "../common/Button";
import { useToggle } from "../../hooks/useToggle";
import Message from "../modal/Message";
import { useAddToCartMutation } from "../../store/slice/cartApi";
import { useSelector } from "react-redux";

const Cart = ({ productImage, productPrice, productName, productId }) => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [value, setValue] = useState(1);
  const [isOpen, toggle] = useToggle({ initialValue: false });
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      if (loggedIn) {
        await addToCart({ productId: productId, amount: value }).unwrap();
      }
    } catch (err) {
      alert(
        `Failed to add product to cart: ${err.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="flex flex-col border w-64 p-2 gap-2 items-center justify-center shadow-xl">
      <main className="w-full border-b-black border-b flex items-center justify-center">
        <img
          src={productImage}
          alt={productName}
          className="w-44 h-44 border-b"
          draggable={false}
        />
      </main>
      <main className="flex justify-between gap-2 w-full">
        <article>
          <h3 className="text-sm font-semibold">{productName}</h3>
          <p className="text-sm text-gray-600">
            ${productPrice.toFixed(2)}/pcs
          </p>
        </article>
        <article className="flex gap-1">
          <span className="opacity-70">qty</span>
          <Counter value={value} setValue={setValue} />
        </article>
      </main>
      <main className="flex justify-between w-full">
        <Button
          variant="primary"
          label="Add to Cart"
          onClick={() => {
            handleAddToCart();
            toggle();
          }}
        />
        <Message isOpen={isOpen} toggle={toggle} message={"Added to Cart"} />
      </main>
    </div>
  );
};

export default Cart;
