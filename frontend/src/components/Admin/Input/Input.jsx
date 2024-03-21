import React from "react";

const Input = ({
  type = "text",
  name = "",
  onChange = () => null,
  children,
}) => {
  return (
    <input
      className="w-full mt-2 rounded-md p-3 text-sm text-gray-400"
      type={type}
      placeholder={children}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
