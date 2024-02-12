import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

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
    </Router>
  );
}

export default Routing;
