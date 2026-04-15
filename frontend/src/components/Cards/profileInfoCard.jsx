import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal";
import Profile from "../../assets/Profile.png";

function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [locationState, setLocationState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      setLocationState(true);
    } else {
      setLocationState(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const handleProfile = () => {};

  return (
    <div className="flex gap-6 items-center justify-center cursor-pointer">
      {locationState ? (
        ""
      ) : (
        <Link
          to="/dashboard"
          className="font-semibold text-green-700 hover:text-black hover:"
        >
          Dashboard
        </Link>
      )}

      <div
        className="inline-block items-center relative "
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center">
          <img
            src={user.profileImageUrl || Profile}
            alt=""
            className="w-11 h-11 bg-gray-300 rounded-full mr-3"
            onClick={handleProfile}
          ></img>
          <div className="text-[15px] text-black font-bold">
            {user.name || ""}
          </div>
        </div>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "50px",

              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              width: "140px",
              zIndex: 999,
            }}
            className="text-center"
          >
            <div className="text-[15px] text-black font-bold leading-5 p-2 rounded-full">
              <button
                className="text-green-600 text-sm font-semi-bold cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal></Modal>
    </div>
  );
}

export default ProfileInfoCard;
