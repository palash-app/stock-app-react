import React, { useEffect, useState } from "react";
import "./Sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import QueryTool from "../QueryTool/QueryTool";

const preModules = [
  {
    id: 100210120154231,
    data: {
      given: [
        {
          id: "1708775211356",
          statement: "all stocks",
          values: {
            0: "all",
          },
          obj: {
            regex: "^(\\w+) stocks$",
            statements: ["all stocks", "nifty50 stocks", "nifty100 stocks"],
            variables: {
              0: ["all", "nifty50", "nifty100"],
            },
          },
        },
      ],
      when: [
        {
          id: "1708775382044",
          statement: "week close ema <number> > close",
          values: {
            0: "week",
            1: "high",
            2: "ma",
            3: 15,
            4: "<",
            5: "open",
          },
          obj: {
            regex: "^(\\w+) (\\w+) (\\w+) (\\d+) ([><=!]+) (\\w+)$",
            statements: [
              "day close ema <number> > close",
              "week close ema <number> > close",
              "hour close ema <number> > close",
            ],
            variables: {
              0: ["day", "week", "hour"],
              1: ["close", "open", "high", "low"],
              2: ["ema", "ma"],
              3: ["<number>"],
              4: [">", "<", "!=", "==", ">=", "<="],
              5: ["close", "open", "high", "low"],
            },
          },
        },
      ],
      then: [
        {
          id: "1708775382044",
          statement: "week close ema <number> > close",
          values: {
            0: "hour",
            1: "open",
            2: "ema",
            3: 25,
            4: "<=",
            5: "close",
          },
          obj: {
            regex: "^(\\w+) (\\w+) (\\w+) (\\d+) ([><=!]+) (\\w+)$",
            statements: [
              "day close ema <number> > close",
              "week close ema <number> > close",
              "hour close ema <number> > close",
            ],
            variables: {
              0: ["day", "week", "hour"],
              1: ["close", "open", "high", "low"],
              2: ["ema", "ma"],
              3: ["<number>"],
              4: [">", "<", "!=", "==", ">=", "<="],
              5: ["close", "open", "high", "low"],
            },
          },
        },
      ],
    },
  },
];

function Sidenav() {
  const [subModules, setSubModules] = useState([]);

  const addSubModule = () => {
    const newSubModules = [
      ...subModules,
      { id: `${Date.now() + Math.floor(Math.random() * 10000)}`, data: {} },
    ];
    setSubModules(newSubModules);
  };

  const removeSubModule = id => {
    const updatedSubModules = subModules.filter(
      subModule => subModule.id !== id
    );
    setSubModules(updatedSubModules);
  };

  return (
    <aside className="sidenav">
      <div className="side-head d-flex justify-content-between align-items-center">
        <button className="button-13" onClick={addSubModule}>
          <FontAwesomeIcon icon={faPlus} />
          Add Query
        </button>
        {subModules.length > 0 && (
          <button className="count-btn">{subModules.length}</button>
        )}
      </div>

      <div className="module">
        {subModules.map((subModule, index) => (
          <QueryTool
            key={subModule.id}
            removeSubModule={removeSubModule}
            subModule={subModule}
          />
        ))}
      </div>
    </aside>
  );
}

export default Sidenav;
