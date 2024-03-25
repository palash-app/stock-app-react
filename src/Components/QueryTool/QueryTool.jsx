import React, { useRef, useState } from "react";
import {
  faAngleDown,
  faFootball,
  faMinus,
  faPlay,
  faRotateRight,
  faVolleyball,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./query.css";
import { apiPostWithTimeOut, getValueOrDefault } from "../../utils/services";
import GherkinQuery from "./TreeNode/GherkinQuery";
import { toast } from "react-toastify";
import API from "../../utils/url";

function QueryTool({ id, removeCallback, index, allSteps }) {
  const gherkinRef = useRef(null);
  const [expanded, setExpanded] = useState(true);
  const [resultExpand, setResultExpand] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Relative Strength");
  const [stepTypeToAdd, setStepTypeToAdd] = useState({ type: "", id: "" });
  // var stepTypeToRemove = { "type": "", "id": "" }

  // Add to query, by default given, when and then are added. The step is blank
  // and hence no data now. The steps will be updated by the user. Also, additional
  // when and then steps can be added by user.
  const addStepType = (type) => {
    setStepTypeToAdd({
      id: `${Date.now()}`,
      type: type,
    });
  };

  // Get result of the query
  const getResultList = (apiResponse) => {
    var tickers = [];
    if (apiResponse.status) {
      var gherkin_response = apiResponse.data["gherkin"];
      var scenario = Object.keys(gherkin_response)[0];
      var error = getValueOrDefault(gherkin_response, "error", "");
      if (error === "") {
        tickers = gherkin_response[scenario]["tickers"];
      } else {
        console.error("gherkin_query error");
      }
    } else {
      // Prompt user of error
      alert("Error in query");
    }

    return tickers;
  };

  // Make post request to server and get query result
  const submitQuery = async () => {
    let feature = "Feature: v2"; // gherkin query version 2
    let scenario = `Scenario:${title}`;
    let gherkin = `${feature}\n${scenario}\n${htmlDomToString(
      gherkinRef.current.getElementsByClassName("tree-view")
    )}`;

    let gherkinQuery = {
      query: `webserver --gherkin ${gherkin} --indicator gherkin`,
    };
    let apiResponse = await apiPostWithTimeOut(
      API["gherkin-query"],
      120000,
      gherkinQuery
    );
    setResult(getResultList(apiResponse));
    setLoading(false);
    toast.success("Submit Successfull ");
  };

  return (
    <Card id="query-card" key={id}>
      <Card.Body className={`m-1 p-1 ${expanded ? "" : "expanded"}`}>
        <div
          className="d-flex justify-content-between gx-1 mx-1 align-items-center"
          style={{ height: "35px" }}
        >
          <div style={{ width: "50%" }}>
            <input
              id="card_title"
              className="query-title"
              value={title}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setTitle(e.target.value);
                }
              }}
            ></input>
          </div>
          <div className="card-buttons">
            <button
              className="btn p-1 text-dark border-none"
              onClick={() => {
                addStepType("When");
              }}
            >
              {<FontAwesomeIcon icon={faVolleyball} color="#0D9276" />}
            </button>
            <button
              className="btn p-1 text-dark border-none"
              onClick={() => {
                addStepType("Then");
              }}
            >
              {<FontAwesomeIcon icon={faFootball} color="#0D9276" />}
            </button>
            {loading ? (
              <button className="btn btn-sm border-none">
                <FontAwesomeIcon className="spinner" icon={faRotateRight} />
              </button>
            ) : (
              <button className="btn btn-sm border-none" onClick={submitQuery}>
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
                removeCallback(id);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        <hr className="mt-0" />
        <div ref={gherkinRef}>
          {
            <GherkinQuery
              key={stepTypeToAdd.id}
              stepTypeToAdd={stepTypeToAdd.type}
              stepTypeToRemove={null}
              allSteps={allSteps}
            ></GherkinQuery>
          }
        </div>
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
          <ul style={{ height: "200px", overflowY: "auto" }}>
            {result.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </Card.Footer>
      )}
    </Card>
  );
}

// Helper method to fetch gherkin query string from HTML DOM
export function htmlDomToString(stepsCollection) {
  let gherkinStepsList = [];
  for (let gherkinSteps of stepsCollection) {
    var stepList = [];
    for (let steps of gherkinSteps.getElementsByClassName("children")) {
      var dataList = [];
      if (steps !== undefined) {
        for (let dv of steps.children) {
          switch (dv.firstChild.tagName) {
            case "SELECT":
            case "INPUT":
              dataList.push(dv.firstChild.value);
              break;
            case "P":
              dataList.push(dv.firstChild.textContent);
              break;
            default:
              throw new Error("This should not happen");
          }
        }
      }
      stepList.push(dataList.join(" "));
    }

    gherkinStepsList.push([
      gherkinSteps.children[0].children[0].textContent,
      stepList,
    ]);
  }

  let gherkinString = "";
  for (let [type, query] of gherkinStepsList) {
    let stepString = type + " " + query[0] + "\n";
    for (let i = 1; i < query.length; i++) {
      stepString = stepString + "* " + query[i] + "\n";
    }

    gherkinString = gherkinString + stepString;
  }

  return gherkinString;
}
export default QueryTool;
