// TreeView.js
import React, { useEffect, useState } from "react";
import "./treeView.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faRectangleXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axios from "axios";
import AutocompleteInput from "../AutoComplete/AutoComplete";
import SelectedQuery from "./SelectedQuery";

const TreeNode = ({ title, queries, preData, handleQueryChange }) => {
  const [isGivenExpanded, setGivenExpanded] = useState(false);
  const [givenChild, setGivenChild] = useState([]);
  const [statements, setStatements] = useState([]);

  const addQuery = (obj, state) => {
    let q = {
      id: `${new Date().getTime()}`,
      str: state,
      obj,
    };
    setStatements(prev => [
      ...prev,
      { id: q.id, regex: obj.regex, str: state, obj: obj },
    ]);
    setGivenChild(prev => [...prev, q]);
  };

  function updateItemById(array, id, updateCallback) {
    return array.map(item => {
      if (item.id === id) {
        return updateCallback(item);
      }
      return item;
    });
  }
  const closeQuery = id => {
    const arr = givenChild.filter(item => item.id !== id);
    const arr1 = statements.filter(item => item.id !== id);
    setGivenChild(arr);
    setStatements(arr1);
  };

  const changeQuery = (s, id) => {
    const newArray = updateItemById(statements, id, currentItem => {
      return {
        ...currentItem,
        str: s,
      };
    });
    const newArray1 = updateItemById(givenChild, id, currentItem => {
      return {
        ...currentItem,
        str: s,
      };
    });
    setGivenChild(newArray1);
    setStatements(newArray);
  };

  useEffect(() => {
    if (!!preData) {
      setGivenChild(preData);
      setStatements(pre => [...pre, ...preData]);
    }
  }, [preData]);

  useEffect(() => {
    handleQueryChange(statements);
  }, [statements]);

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
              <li key={index}>
                <div className="d-flex justify-content-between">
                  <SelectedQuery
                    key={item.id}
                    query={item}
                    idx={index}
                    changeQuery={changeQuery}
                  />
                  <div>
                    <button
                      className="close-btn"
                      onClick={() => {
                        closeQuery(item.id);
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

const TreeView = ({ setQuery, data }) => {
  const [queryList, setQueryList] = useState([]);
  const [givenList, setGivenList] = useState([]);
  const [whenList, setWhenList] = useState([]);
  const [thenList, setThenList] = useState([]);

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
        "https://gorgeous-turtle-loudly.ngrok-free.app",
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
    fetchQueries();
  }, []);

  return (
    <>
      <TreeNode
        title="Given"
        queries={queryList}
        preData={data.given}
        handleQueryChange={handleGivenChange}
      />
      <TreeNode
        title="When"
        queries={queryList}
        preData={data.when}
        handleQueryChange={handleWhenChange}
      />
      <TreeNode
        title="Then"
        queries={queryList}
        preData={data.then}
        handleQueryChange={handleThenChange}
      />
    </>
  );
};

export default TreeView;
