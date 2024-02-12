import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("token") ? true : false;
  // const isLoggedIn= expireTime > (now-setTime);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
