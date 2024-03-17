import React, { useEffect, useState } from "react";
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
import { checkQuery, replaceItemAtIndex, apiPostWithTimeOut, getValueOrDefault } from "../../utils/services";
import API from "../../utils/url";
import { useRecoilState } from "recoil";
import { queryAtom } from "../../utils/state";
import { toast } from "react-toastify";

const QueryTool = ({ removeSubModule, subModule }) => {
  const [expanded, setExpanded] = useState(true);
  const [resultExpand, setResultExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState({ given: [], when: [], then: [] });
  const [title, setTitle] = useState("Relative Strength");
  const [qAtom, setQAtom] = useRecoilState(queryAtom);
  const index = qAtom.findIndex(listItem => listItem.id == subModule.id);

  const getResultList = apiResponse => {
    var tickers = []
    if (apiResponse.status) {
      var gherkin_response = apiResponse.data['gherkin']
      var scenario = Object.keys(gherkin_response)[0]
      var error = getValueOrDefault(gherkin_response, 'error', '')
      if (error == '') {
        tickers = gherkin_response[scenario]['tickers']
      } else {
        console.error('gherkin_query error')
      }
    } else {
      // Prompt user of error
      alert("Error in query")
    }

    return tickers
  };

  const submitQuery = async () => {
    let match = checkQuery(query);
    let feature = title;
    setResult([]);
    if (!match) {
      console.log("error");
      toast.error("Check the query");
    } else {
      let obj = { feature: feature, scenario: feature, ...query };
      setLoading(true);

      let gherkinQuery = { "query": `webserver --gherkin ${conCatQuery(obj)} --indicator gherkin` };
      let apiResponse = await apiPostWithTimeOut(API["gherkin-query"], 120000, gherkinQuery)
      setResult(getResultList(apiResponse))
      setLoading(false);
      toast.success("Submit Successfull ");
    }
  };

  const conCatQuery = obj => {
    let str = `Feature:v2\nScenario:${obj.scenario}\n`;
    let given = obj.given.map(g => g.str).join("\n* ");
    let when = obj.when.map(g => g.str).join("\n* ");
    let then = obj.then.map(g => g.str).join("\n* ");
    return `${str}Given ${given}\nWhen ${when}\nThen ${then}`;
  };

  useEffect(() => {
    const newList = replaceItemAtIndex(qAtom, index, {
      ...subModule,
      given: query.given,
      when: query.when,
      then: query.then,
    });
    setQAtom(newList);
  }, [query]);

  return (
    <>
      <Card id="query-card" key={subModule.id}>
        <Card.Body className={`m-1 p-1 ${expanded ? "" : "expanded"}`}>
          <div
            className="d-flex justify-content-between gx-1 mx-1 align-items-center"
            style={{ height: "35px" }}
          >
            <div style={{ width: "50%" }}>
              <input
                id="card_title"
                className="fw-bold p-1"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              ></input>
            </div>
            <div className="card-buttons">
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
            <ul style={{ height: "200px", overflowY: "auto" }}>
              {result.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export default QueryTool;
