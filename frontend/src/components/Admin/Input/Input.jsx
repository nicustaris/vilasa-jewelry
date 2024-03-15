import React from "react";

const Input = ({ type = "text", children }) => {
  return (
    <input
      className="w-full mt-2 rounded-md p-3 text-sm text-gray-400"
      type={type}
      placeholder={children}
    />
  );
};

export default Input;
