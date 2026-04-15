import React, { useContext } from "react";
import ProfileInfoCard from "./Cards/profileInfoCard";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Navbar() {
  return (
    <div className="h-fit pt-6 px-4 bg-white border border-b border-gray-200/5 backdrop-blur-[2px] py-2.5 md:px-0 sticky top-0 z-100">
      <div className="container bg-white  mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard">
          <h2 className="text-xl font-bold text-green-700 cursor-pointer">
            Interview Prep AI
          </h2>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
}

export default Navbar;
