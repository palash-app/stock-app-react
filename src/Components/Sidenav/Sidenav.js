import React, { useEffect, useState } from "react";
import "./Sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import QueryTool from "../QueryTool/QueryTool";

function Sidenav() {
  const [subModules, setSubModules] = useState([]);

  const addSubModule = () => {
    const newSubModules = [
      ...subModules,
      { id: `${Date.now() + Math.floor(Math.random() * 10000)}` },
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
      <button className="button-13" role="button" onClick={addSubModule}>
        <FontAwesomeIcon icon={faPlus} />
        Add Query
      </button>

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
