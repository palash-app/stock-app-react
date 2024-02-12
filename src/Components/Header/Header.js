import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFile,
  faPlus,
  faPowerOff,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header({ addChart }) {
  const stocks = ["NSEBANK", "EXIDEIND", "ACE"];
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="header shadow">
      <div>
        <button className="btn btn-primary" onClick={addChart}>
          Add chart
        </button>
      </div>
      <div>
        <button className="subButton" id="logout" onClick={logout}>
          <FontAwesomeIcon icon={faPowerOff} />
        </button>
      </div>
    </div>
  );
}

export default Header;
