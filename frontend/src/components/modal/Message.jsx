import React from "react";
import Button from "../common/Button";

const Message = ({ message, button = false, isOpen, toggle, onclick }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col gap-2 items-center border rounded-lg p-4 shadow-md bg-white">
        <p className="text-lg font-semibold">{message}</p>
        <section className="flex gap-2">
          <Button
            variant="primary"
            label={button ? "Yes" : "Ok"}
            onClick={() => {
              toggle();
            }}
            className="w-16"
          />
          {button && (
            <Button
              variant="secondary"
              label="No"
              className="w-14"
              onClick={toggle}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Message;
