import React, { useState } from "react";
import Container from "../components/container"; // Assuming you have this from previous components
import Button from "../components/common/Button"; // Assuming you have this reusable button component
import { useNavigate } from "react-router-dom";
import Message from "../components/modal/Message";
import { useToggle } from "../hooks/useToggle";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isOpen, toggle] = useToggle({ initialValue: false });

  const handlePayment = () => {
    if (paymentMethod === "esewa") {
      // Redirect to eSewa payment page
      setCode(0);
      toggle();
    }
  };
  // eSewa QR code image (replace with actual eSewa QR code for your merchant)
  const eSewaQRCode = "https://example.com/esewa-qrcode.png"; // Replace with a real eSewa QR code URL or image path

  return (
    <Container>
      <Message
        isOpen={isOpen}
        toggle={toggle}
        message={"Success"}
        onclick={() => {
          navigate("/");
        }}
      />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Payment Options</h1>

        {/* Payment Method Selection */}
        {!paymentMethod && (
          <div className="space-y-4">
            <Button
              variant="primary"
              label="Pay with eSewa"
              onClick={() => setPaymentMethod("esewa")}
            />
            <Button
              variant="secondary"
              label="Pay with Cash on Delivery"
              onClick={() => setPaymentMethod("cash")}
            />
          </div>
        )}

        {/* eSewa Payment Option */}
        {paymentMethod === "esewa" && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">Scan to Pay with eSewa</h2>
            <img
              src={eSewaQRCode}
              alt="eSewa QR Code"
              className="w-64 h-64 object-contain border border-gray-300 rounded-lg"
            />
            <p className="text-gray-500 text-sm">
              Scan this QR code using the eSewa app to complete your payment.
            </p>
            <input
              type="text"
              className="w-3/4 outline-0 border bg-white rounded-md p-2"
              placeholder="Enter eSewa Transaction Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              variant="primary"
              label={"Pay"}
              className="w-1/12"
              onClick={() => {
                handlePayment();
              }}
            />
            <Button
              variant="secondary"
              label={"Back"}
              onClick={() => {
                setPaymentMethod(null);
                navigate(-2);
              }}
            />
          </div>
        )}

        {/* Cash Payment Option */}
        {paymentMethod === "cash" && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">Pay with Cash on Delivery</h2>
            <p className="text-gray-500 text-sm">
              Your order will be delivered, and you can pay with cash upon
              delivery.
            </p>
            <Button
              variant="secondary"
              label={"Back"}
              className="w-1/12"
              onClick={() => {
                setPaymentMethod(null);
                navigate(-2);
              }}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Payment;
