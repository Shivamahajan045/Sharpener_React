import React from "react";
import "./Button.css";

const Button = ({ children, type }) => {
  return (
    <button className="button" type={type || "button"}>
      {children}
    </button>
  );
};
export default Button;
