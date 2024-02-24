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
          regex: "^(\\w+) (\\w+) (\\w+) (\\d+) ([><=!]+) (\\w+)$",
          str: "day close ema 15 > close",
        },
      ],
      when: [
        {
          regex: "^(\\w+) (\\w+) (\\w+) (\\d+) ([><=!]+) (\\w+)$",
          str: "day close ema 20 > close",
        },
      ],
      then: [
        {
          regex: "^stocks (\\w+(?:,*\\s*\\w*)*)$",
          str: "stocks <list>",
        },
      ],
    },
  },
];

function Sidenav() {
  const [subModules, setSubModules] = useState(preModules);

  const addSubModule = () => {
    const newSubModules = [
      ...subModules,
      { id: `${Date.now() + Math.floor(Math.random() * 10000)}`, data: {} },
    ];
    setSubModules(newSubModules);
  };

  useEffect(() => {
    console.log(subModules);
  }, [subModules]);

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
