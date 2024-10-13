import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-full">
      <Navbar></Navbar>
      <Outlet></Outlet>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
