import React from "react";
import { useParams } from "react-router-dom";

function DeleteSession({ onDelete, onClose }) {
  return (
    <div className="w-[45vw] md:w-[15vw] p-7 flex flex-col justify-center text-center gap-6">
      <h3 className="text-lg font-semibold text-black">Are you sure?</h3>
      <div className="flex gap-4">
        <button
          className="bg-black rounded-full p-2 text-white w-full hover:bg-rose-400 cursor-pointer"
          onClick={onDelete}
        >
          Yes
        </button>
        <button
          className="bg-black rounded-full p-2 text-white w-full hover:bg-green-400 cursor-pointer"
          onClick={onClose}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default DeleteSession;
