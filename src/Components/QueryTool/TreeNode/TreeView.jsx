// TreeView.js
import React, { useEffect, useState } from "react";
import "./treeView.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axios from "axios";
import AutocompleteInput from "../AutoComplete/AutoComplete";
import SelectedQuery from "./SelectedQuery";

const TreeNode = ({ title, queries, handleQueryChange }) => {
  const [isGivenExpanded, setGivenExpanded] = useState(false);
  const [givenChild, setGivenChild] = useState([]);
  const [statements, setStatements] = useState([]);

  const addQuery = (obj, state) => {
    let q = {
      id: `${new Date().getTime()}`,
      statement: state,
      obj,
    };

    setStatements(prev => [...prev, { regex: obj.regex, str: state }]);
    setGivenChild(prev => [...prev, q]);
  };

  const changeQuery = (s, index) => {
    let arr = [...givenChild];
    let arr1 = [...statements];
    arr[index].statement = s;
    arr1[index].str = s;
    setGivenChild(arr);
    setStatements(arr1);
  };

  useEffect(() => {
    handleQueryChange(statements);
  }, [statements, handleQueryChange]);

  return (
    <div className="tree-view">
      <div className="tree-node">
        <div className="node-content">
          <span
            onClick={() => {
              setGivenExpanded(!isGivenExpanded);
            }}
            className="toggle"
            aria-disabled={isGivenExpanded ? "true" : "false"}
          >
            <FontAwesomeIcon
              icon={isGivenExpanded ? faMinus : faPlus}
              className="me-1"
            />
            {title}
          </span>
        </div>
        {isGivenExpanded && (
          <div className="d-flex">
            <AutocompleteInput addQuery={addQuery} queries={queries} />
          </div>
        )}
        <ul>
          {isGivenExpanded &&
            givenChild &&
            givenChild.map((item, index) => (
              <li>
                <SelectedQuery
                  key={item.id}
                  query={item}
                  idx={index}
                  changeQuery={changeQuery}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const TreeView = ({ setQuery, data }) => {
  const [queryList, setQueryList] = useState([]);
  const [givenList, setGivenList] = useState([]);
  const [whenList, setWhenList] = useState([]);
  const [thenList, setThenList] = useState([]);

  console.log(data);

  const handleGivenChange = q => {
    setGivenList(q);
  };
  const handleWhenChange = q => {
    setWhenList(q);
  };
  const handleThenChange = q => {
    setThenList(q);
  };

  const fetchQueries = async () => {
    try {
      const obj = {
        query: "statementlist --do get",
      };
      const response = await axios.post(
        "https://communal-vocal-mayfly.ngrok-free.app",
        obj
      );
      if (response.status == 200) {
        setQueryList(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let obj = {
      given: givenList,
      when: whenList,
      then: thenList,
    };
    setQuery(obj);
  }, [givenList, whenList, thenList]);

  useEffect(() => {
    if (!!data) {
      setGivenList(data.given);
      setWhenList(data.when);
      setThenList(data.then);
    }
    fetchQueries();
  }, []);

  return (
    <>
      <TreeNode
        title="Given"
        queries={queryList}
        handleQueryChange={handleGivenChange}
      />
      <TreeNode
        title="When"
        queries={queryList}
        handleQueryChange={handleWhenChange}
      />
      <TreeNode
        title="Then"
        queries={queryList}
        handleQueryChange={handleThenChange}
      />
    </>
  );
};

export default TreeView;
