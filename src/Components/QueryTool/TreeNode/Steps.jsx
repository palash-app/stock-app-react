// TreeView.js
import React, { useRef, useState } from "react";
import "./treeView.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "react-bootstrap-typeahead/css/Typeahead.css";
import AutocompleteInput from "../AutoComplete/AutoComplete";
import StepParser from "./StepParser";

const Steps = ({ title, steps }) => {
  const stepsRef = useRef(null);
  const [isExpanded, setExpanded] = useState(false);
  const [statements, setStatements] = useState([]);

  const addQuery = (obj, state) => {
    setStatements((prev) => [
      ...prev,
      { id: `${new Date().getTime()}`, str: state, obj: obj },
    ]);
  };

  const deleteStep = (id) => {
    const arr1 = statements.filter((item) => item.id !== id);
    setStatements(arr1);
  };

  return (
    <div className="tree-view">
      <div className="tree-node">
        <div className="node-content">
          <span
            className="toggle"
            aria-disabled={isExpanded ? "true" : "false"}
          >
            <FontAwesomeIcon
              icon={isExpanded ? faMinus : faPlus}
              className="me-1"
              onClick={() => {
                setExpanded(!isExpanded);
              }}
            />
            {title}
            {title !== "Given" && (
              <button className="close-btn">
                <FontAwesomeIcon icon={faRectangleXmark} />
              </button>
            )}
          </span>
        </div>
        {isExpanded && (
          <div className="d-flex">
            <AutocompleteInput addQuery={addQuery} queries={steps} />
          </div>
        )}
        <ul ref={stepsRef}>
          {isExpanded &&
            statements &&
            statements.map((item, index) => (
              <li key={index}>
                <div className="d-flex justify-content-between">
                  <StepParser key={item.id} query={item} />
                  <div>
                    <button
                      className="close-btn"
                      onClick={() => {
                        deleteStep(item.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faRectangleXmark} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Steps;
