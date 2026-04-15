import React, { Children, useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "../Navbar";

function DashboardLayout({ children }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user && <Navbar />}
      {user && <div>{children}</div>}
    </div>
  );
}

export default DashboardLayout;
