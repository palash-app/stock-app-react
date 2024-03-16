import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer
        autoClose={2000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </Router>
  );
}

export default Routing;
