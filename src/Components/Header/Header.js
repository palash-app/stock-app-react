import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFile,
  faFloppyDisk,
  faPlus,
  faPowerOff,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header({ addChart }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="header shadow">
      <div></div>
      <div>
        <button
          className="btn btn-primary"
          id="logout"
          style={{ borderRadius: "23px" }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} /> Save
        </button>
      </div>
    </div>
  );
}

export default Header;
