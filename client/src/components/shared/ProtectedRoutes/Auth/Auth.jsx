import { getUserInfo } from "@/store/userSlice/userSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Auth = ({ children }) => {
  const location = useLocation();
  const userInfo = useSelector(getUserInfo);
  const pathName = location.pathname;

  

  if (
    !userInfo &&
    pathName !== "/" &&
    !pathName.includes("/auth/signin") &&
    !pathName.includes("/auth/signup")
  ) {
    return <Navigate to={"/auth/signin"} />;
  }
  if (
    userInfo &&
    (pathName.includes("/auth/signin") || pathName.includes("/auth/signup"))
  ) {
    return <Navigate to={"/"}></Navigate>;
  }

  return children;
};

export default Auth;
