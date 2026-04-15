import React from "react";

function Button({ primary, secondary, text, onClick, type }) {
  return (
    <button
      className={`${primary} text-white font-medium text-sm px-7 py-4 rounded-full ${secondary} transition-colors cursor-pointer`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;
