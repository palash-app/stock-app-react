import React, { useRef, useState } from "react";
import {
  faAngleDown,
  faMinus,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import TreeView from "../../Pages/TreeNode/TreeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./query.css";
import { checkQuery } from "../../utils/services";

const QueryTool = ({ removeSubModule, subModule }) => {
  const [expanded, setExpanded] = useState(true);
  const [query, setQuery] = useState({ given: [], when: [], then: [] });
  const title = useRef();

  const submitQuery = () => {
    let match = checkQuery(query);
    let feature = title.current.innerText;
    if (!match) {
      console.log("please Check all the query");
    } else {
      let obj = { feature: feature, scenario: feature, ...query };
      let str = conCatQuery(obj);
      console.log(str);
    }
  };

  const conCatQuery = obj => {
    let str = `Feature:${obj.feature}\nScenario:${obj.scenario}\n`;
    let given = obj.given.map(g => g.str).join("\n* ");
    let when = obj.when.map(g => g.str).join("\n* ");
    let then = obj.then.map(g => g.str).join("\n* ");
    return `${str}Given ${given}\nWhen ${when}\nThen ${then}`;
  };

  return (
    <>
      <Card className={`m-1 ${expanded ? "" : "expanded"}`} key={subModule.id}>
        <Card.Body className="p-1">
          <div
            className="d-flex justify-content-between mx-2 align-items-center"
            style={{ height: "35px" }}
          >
            <span
              className="fw-bold"
              contentEditable
              ref={title}
              style={{ fontSize: "0.8rem" }}
            >
              Relative strength
            </span>
            <div>
              <button className="btn btn-sm border-none" onClick={submitQuery}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button
                className="btn p-1 text-dark border-none"
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {expanded ? (
                  <FontAwesomeIcon icon={faMinus} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </button>
              <button
                className="btn p-1 text-danger border-none"
                onClick={() => {
                  removeSubModule(subModule.id);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
          <hr className="mt-0" />
          <TreeView setQuery={setQuery} />
          <div className="d-flex justify-content-end m-2"></div>
        </Card.Body>
      </Card>
    </>
  );
};

export default QueryTool;
