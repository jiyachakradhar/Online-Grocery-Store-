import React, { useState } from "react";
import Container from "../components/container";
import Detail from "../components/cart/Detail";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../hooks/useToggle";
import Message from "../components/modal/Message";
import { useGetCartQuery } from "../store/slice/cartApi";

const Cart = () => {
  const navigate = useNavigate();
  const [isOpen, toggle] = useToggle({ initialValue: false });
  const [isConfirmOpen, toggleConfirm] = useToggle({ initialValue: false });
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  // Use the RTK Query hook to get the cart from the backend
  const { data, isLoading, error } = useGetCartQuery();
  // Assuming the API response structure is { data: cart }
  const cart = data?.data[0];

  const Payment = () => {
    navigate("/payment");
  };

  if (isLoading) {
    return (
      <Container>
        <Button
          variant="secondary"
          label={"Back"}
          className="w-1/12"
          onClick={() => navigate(-1)}
        />
        <main className="flex items-center justify-center flex-col gap-4 shadow-md flex-1 border w-full py-2">
          <header className="w-full border-b flex items-center justify-center">
            <h1 className="text-3xl">Cart</h1>
          </header>
          <article className="flex-grow text-center">
            <p className="text-gray-500">Loading cart data...</p>
          </article>
          <footer className="border-t flex items-center justify-center"></footer>
        </main>
      </Container>
    );
  }

  if (error || !cart) {
    return (
      <Container>
        <Button
          variant="secondary"
          label={"Back"}
          className="w-1/12"
          onClick={() => navigate(-1)}
        />
        <main className="flex items-center justify-center flex-col gap-4 shadow-md flex-1 border w-full py-2">
          <header className="w-full border-b flex items-center justify-center">
            <h1 className="text-3xl">Cart</h1>
          </header>
          <article className="flex-grow text-center">
            <p className="text-gray-500">
              {error?.message || `No cart found.`}
            </p>
          </article>
          <footer className="border-t flex items-center justify-center"></footer>
        </main>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        variant="secondary"
        label={"Back"}
        className="w-1/12"
        onClick={() => navigate(-1)}
      />
      <main className="flex items-center justify-center flex-col shadow-md flex-1 border w-full py-2">
        <header className="w-full border-b flex items-center justify-center">
          <h1 className="text-3xl">Cart</h1>
        </header>
        <article className="flex-grow w-full overflow-y-auto px-2 gap-1 flex-col flex">
          {cart.products.map((item) => (
            <Detail
              key={item.product._id}
              productId={item.product._id}
              productImage={item.product.productImage}
              productName={item.product.productName}
              productPrice={item.product.productPrice}
              amount={item.amount}
            />
          ))}
        </article>
        <footer className="border-t flex w-full items-center justify-between px-4 py-2">
          <section className="flex items-center">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 mr-2 outline-0"
            />
            <input
              type="text"
              placeholder="Contact Information"
              value={contact}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 10 || !/^\d*$/.test(value)) return;
                setContact(value);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 mr-2 outline-0"
            />
          </section>
          <section className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              Total: ${cart.totalAmount.toFixed(2)}
            </span>
            <Button
              variant="primary"
              label="Checkout"
              className="w-20"
              onClick={() => {
                if (!address || !contact) {
                  toggle();
                } else {
                  toggleConfirm();
                }
              }}
            />
          </section>
        </footer>
      </main>

      {/* Missing Details Modal */}
      <Message
        isOpen={isOpen}
        toggle={toggle}
        message={"Please fill in the address and contact details."}
        onclick={() => {}}
      />

      {/* Confirm Checkout Modal */}
      <Message
        isOpen={isConfirmOpen}
        toggle={toggleConfirm}
        button={true}
        message={"Are all details correct?"}
        onclick={() => {
          toggleConfirm();
          Payment();
        }}
      />
    </Container>
  );
};

export default Cart;
