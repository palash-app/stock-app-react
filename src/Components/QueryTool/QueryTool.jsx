import React, { useState } from "react";
import {
  faAngleDown,
  faMinus,
  faPlay,
  faRotateRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import TreeView from "./TreeNode/TreeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./query.css";
import { checkQuery } from "../../utils/services";

const QueryTool = ({ removeSubModule, subModule }) => {
  const [expanded, setExpanded] = useState(true);
  const [resultExpand, setResultExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState({ given: [], when: [], then: [] });
  const [title, setTitle] = useState("Relative Strength");

  const submitQuery = async () => {
    let match = checkQuery(query);
    let feature = title;
    setResult([]);
    if (!match) {
      alert("please Check all the query");
    } else {
      let obj = { feature: feature, scenario: feature, ...query };
      setLoading(true);

      // ↓↓↓↓↓↓ submit api with this string below(str) ↓↓↓↓↓↓↓
      let str = conCatQuery(obj);
      console.log(str);
      // ↑↑↑↑↑↑ submit api with this string below(str) ↑↑↑↑↑↑↑

      //  Testing Loader ---------------->>>>
      await new Promise(resolve => setTimeout(resolve, 1000));

      //  set Demo result list ------->>>
      setResult(["ABCD", "EFGH", "IJKL"]);

      //  Loading off ----->>>
      setLoading(false);
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
      <Card id="query-card" key={subModule.id}>
        <Card.Body className={`m-1 p-1 ${expanded ? "" : "expanded"}`}>
          <div
            className="d-flex justify-content-between mx-2 align-items-center"
            style={{ height: "35px" }}
          >
            <div>
              <input
                id="card_title"
                className="fw-bold p-1"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              ></input>
            </div>
            <div>
              {loading ? (
                <button className="btn btn-sm border-none">
                  <FontAwesomeIcon className="spinner" icon={faRotateRight} />
                </button>
              ) : (
                <button
                  className="btn btn-sm border-none"
                  onClick={submitQuery}
                >
                  <FontAwesomeIcon icon={faPlay} color="#40A2E3" />
                </button>
              )}
              <button
                className="btn p-1 text-dark border-none"
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {expanded ? (
                  <FontAwesomeIcon icon={faMinus} color="#0D9276" />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} color="#0D9276" />
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
          <TreeView setQuery={setQuery} data={subModule} />
          <div className="d-flex justify-content-end m-2"></div>
        </Card.Body>

        {/* Result */}
        {result.length > 0 && (
          <Card.Footer className={`m-1 p-1 ${resultExpand ? "" : "expanded"}`}>
            <div
              className="d-flex justify-content-between mx-2 align-items-center"
              style={{ height: "35px" }}
            >
              <div>
                <span className="fw-bold p-1" style={{ fontSize: "0.8rem" }}>
                  Result
                </span>
              </div>
              <div>
                <button
                  className="btn p-1 text-dark border-none"
                  onClick={() => {
                    setResultExpand(!resultExpand);
                  }}
                >
                  {resultExpand ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                  )}
                </button>
              </div>
            </div>
            <ul>
              {result.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export default QueryTool;
