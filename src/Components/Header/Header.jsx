import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faFloppyDisk,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { ListGroup, Modal, Offcanvas } from "react-bootstrap";
import { apiPostWithTimeOut } from "../../utils/services";
import API from "../../utils/url";
import { htmlDomToString } from "../QueryTool/QueryTool";

function Header() {
  const [show, setShow] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [layoutName, setLayoutName] = useState("");
  const navigate = useNavigate();
  const savedLayouts = []; // TODO call server to fetch config and layout

  const AddLayout = () => {
    setShowCanvas(false);
    setShow(true);
  };

  const selectLayout = (obj, index) => {
    setSelectedIndex(index);
    setShowCanvas(false);
  };

  const saveLayout = async () => {
    if (layoutName !== "") {
      var queryConfig = {};
      var queryCount = 0;
      for (let query of document.querySelector(".module").children) {
        let feature = "Feature: v2"; // gherkin query version 2
        // Add ms to scenario value for cases when user uses the same query name
        let scenario = `Scenario:${
          query.getElementsByClassName("query-title")[0].value
        }`;
        let gherkin = `${feature}\n${scenario}\n${htmlDomToString(
          query.getElementsByClassName("tree-view")
        )}`;
        queryConfig[scenario + `:${queryCount}`] = gherkin;
        queryCount = queryCount + 1;
      }

      setLayoutName("");
      var data = {};
      data[layoutName] = queryConfig;
      await apiPostWithTimeOut(API["save-layout"], 120000, data);
      setShow(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="header shadow">
      <div>
        <Modal
          size="sm"
          centered
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Modal.Header closeButton className="p-1 px-2 fs-6">
            <Modal.Title className="fs-6">Save Layout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="d-flex flex-column justify-content-end"
              style={{ gap: "5px" }}
            >
              <input
                className="save-input"
                type="text"
                placeholder="Enter Name"
                value={layoutName}
                onChange={(e) => {
                  setLayoutName(e.target.value);
                }}
              />
              <div className="text-end">
                <button className="btn btn-sm btn-success" onClick={saveLayout}>
                  Save
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Offcanvas
          placement="end"
          show={showCanvas}
          onHide={() => {
            setShowCanvas(false);
          }}
          style={{
            maxWidth: "200px",
            backgroundColor: "#BBE2EC",
            color: "#0D9276",
          }}
        >
          <Offcanvas.Header closeButton className="fs-6 p-2">
            <Offcanvas.Title>Layouts</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <ListGroup>
              {savedLayouts.length > 0 &&
                savedLayouts.map((item, index) => (
                  <ListGroup.Item
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      borderRadius: "0",
                      fontSize: "1em",
                      backgroundColor: `${
                        index === selectedIndex ? "#0D9276" : "#FFF6E9"
                      }`,
                      color: `${
                        index === selectedIndex ? "#BBE2EC" : "#0D9276"
                      }`,
                    }}
                    onClick={() => {
                      selectLayout(item, index);
                    }}
                  >
                    {item.name}
                  </ListGroup.Item>
                ))}
              <ListGroup.Item
                className="p-1"
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: "0",
                  fontSize: "1em",
                  backgroundColor: "#0D9276",
                  color: "#BBE2EC",
                }}
                onClick={AddLayout}
              >
                <FontAwesomeIcon icon={faPlus} />
              </ListGroup.Item>
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div>
        <button
          className="btn text-light"
          id="logout"
          style={{ borderRadius: "23px", fontSize: "1.2rem" }}
          onClick={() => {
            setShow(true);
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
      </div>
      <div>
        <button
          className="btn btn-sm"
          style={{ color: "#BBE2EC", fontSize: "1.2rem" }}
          onClick={() => {
            setShowCanvas(true);
          }}
        >
          {!showCanvas ? (
            <FontAwesomeIcon icon={faAngleRight} />
          ) : (
            <FontAwesomeIcon icon={faAngleLeft} />
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;