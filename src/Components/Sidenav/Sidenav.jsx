import React, { useEffect, useState } from "react";
import "./Sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import QueryTool from "../QueryTool/QueryTool";
import API from "../../utils/url";
import axios from "axios";

function Sidenav() {
  const [queryIds, setQueryIds] = useState([]);
  const [allSteps, setAllSteps] = useState([]);

  // Fetch statement list from server
  useEffect(() => {
    async function fetchAllSteps() {
      try {
        const obj = {
          query: "statementlist --do get",
        };
        const response = await axios.post(API["root"], obj);
        if (response.status === 200) {
          setAllSteps(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllSteps();
  }, []);

  // Add query
  const addQuery = () => {
    const queryId = `${Date.now()}`;
    setQueryIds((prevQueryIds) => [...prevQueryIds, queryId]);
  };

  // Remove query
  const removeQuery = (id) => {
    var updatedQueries = queryIds.slice();
    updatedQueries = updatedQueries.filter((itrId) => itrId !== id);
    setQueryIds(updatedQueries);
  };

  return (
    <aside className="sidenav">
      <div className="side-Titlehead">
        <h3>Queries</h3>
      </div>
      <hr />
      <div className="side-head d-flex justify-content-between align-items-center">
        <button className="button-13" onClick={addQuery}>
          <FontAwesomeIcon icon={faPlus} />
          Add Query
        </button>
      </div>
      <div className="module">
        {queryIds.map((id, index) => (
          <QueryTool
            key={id}
            id={id}
            removeCallback={removeQuery}
            index={index}
            allSteps={allSteps} // passing all steps to child
          />
        ))}
      </div>
    </aside>
  );
}

export default Sidenav;
