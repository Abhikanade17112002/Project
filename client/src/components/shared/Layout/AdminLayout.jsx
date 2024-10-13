import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      {children}
      <Footer />
    </div>
  );
};

export default AdminLayout;
