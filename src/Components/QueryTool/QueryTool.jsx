import React, { useRef, useState, useEffect } from "react";
import {
    faAngleDown,
    faMinus,
    faPenToSquare,
    faPlay,
    faRotateRight,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import TreeView from "./TreeNode/TreeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./query.css";
import { apiPostWithTimeOut, checkQuery } from "../../utils/services";
import API from "../../utils/URL";

const QueryTool = ({ removeSubModule, subModule }) => {
    const [expanded, setExpanded] = useState(true);
    const [resultExpand, setResultExpand] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState({ given: [], when: [], then: [] });
    const [shouldFetch, setShouldFetch] = useState(false);
    // var shouldFetch = false
    const title = useRef();
    const conjunction_keyword = ['And ', '* ']

    const conCatQuery = obj => {
        let str = `Feature:${obj.feature}\nScenario:${obj.scenario}\n`;
        let given = obj.given.map(g => g.str).join("\n* ");
        let when = obj.when.map(g => g.str).join("\n* ");
        let then = obj.then.map(g => g.str).join("\n* ");
        return `${str}Given ${given}\nWhen ${when}\nThen ${then}`;
    };

    const getResultList = apiResponse => {
        var tickers = []
        if (apiResponse.status) {
            var gherkin_response = apiResponse.data
            var feature = Object.keys(gherkin_response["gherkin"])[0]
            for (var scenario in gherkin_response['gherkin'][feature]) {
                var current_keyword = ""
                var steps = gherkin_response['gherkin'][feature][scenario]
                steps.forEach(step => {
                    if (step['type'] == 'Then ' || (current_keyword == 'Then ' && current_keyword in conjunction_keyword)) {
                        step['result']['pipe_tickers'].forEach(ticker => {
                            if (!tickers.includes(ticker)) {
                                tickers.push(ticker)
                            }
                        })
                        current_keyword = 'Then '
                    }
                });
            }
        } else {
            // Prompt user of error
            alert("Error in query")
        }

        return tickers
    };

    const submitQuery = async () => {
        let match = checkQuery(query);
        let feature = title.current.innerText;
        setResult([]);
        if (!match) {
            alert("please Check all the query");
        } else {
            let obj = { feature: feature, scenario: feature, ...query };
            setLoading(true);
            let gherkinQuery = { "query": `webserver --gherkin ${conCatQuery(obj)} --indicator gherkin` };
            let apiResponse = await apiPostWithTimeOut(API["gherkin-query"], 120000, gherkinQuery)
            setResult(getResultList(apiResponse))
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldFetch && !loading) {
            submitQuery();
            // shouldFetch = false
            setShouldFetch(false); // Reset the flag after fetching
        }
    }, [shouldFetch]);

    return (
        <>
            <Card id="query-card" key={subModule.id}>
                <Card.Body className={`m-1 p-1 ${expanded ? "" : "expanded"}`}>
                    <div
                        className="d-flex justify-content-between mx-2 align-items-center"
                        style={{ height: "35px" }}
                    >
                        <div>
                            <span>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </span>
                            <span
                                className="fw-bold p-1"
                                contentEditable
                                ref={title}
                                style={{ fontSize: "0.8rem" }}
                            >
                                Relative strength
                            </span>
                        </div>
                        <div>
                            {loading ? (
                                <button className="btn btn-sm border-none">
                                    <FontAwesomeIcon className="spinner" icon={faRotateRight} />
                                </button>
                            ) : (
                                <button
                                    className="btn btn-sm border-none"
                                    onClick={() => setShouldFetch(true)}
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
                    <TreeView setQuery={setQuery} />
                    <div className="d-flex justify-content-end m-2"></div>
                </Card.Body>
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
                        {result.length > 0 && (
                            <ul>
                                {result.map(item => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                        )}
                    </Card.Footer>
                )}
            </Card>
        </>
    );
};

export default QueryTool;
