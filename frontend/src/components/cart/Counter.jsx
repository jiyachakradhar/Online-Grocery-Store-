import React, { useEffect, useState } from "react";

const Counter = ({ value, setValue }) => {
  useEffect(() => {
    if (value < 1) {
      setValue(1);
    }
  }, [value]);
  return (
    <div className="border border-black rounded-xl flex justify-center items-center w-24 h-7">
      <button
        onClick={() => setValue(value + 1)}
        className="border-r px-2 text-center"
      >
        +
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-transparent w-10 text-center border-none outline-none"
      />
      <button
        onClick={() => setValue(value - 1)}
        className="border-l px-2 text-center"
      >
        -
      </button>
    </div>
  );
};

export default Counter;
