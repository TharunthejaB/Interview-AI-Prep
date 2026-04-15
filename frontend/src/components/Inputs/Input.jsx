import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({ value, onChange, label, placeholder, type }) {
  const [showPassword, setShowpassword] = useState(false);
  const togglepassword = () => {
    setShowpassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[12px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        ></input>
        {type == "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={togglepassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={togglepassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Input;
