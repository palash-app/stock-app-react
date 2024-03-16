import React, { useEffect, useState } from "react";
import "./Sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import QueryTool from "../QueryTool/QueryTool";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { queryAtom, selectedQAtom } from "../../utils/state";

function Sidenav() {
  const [subModules, setSubModules] = useState([]);
  const setQAtom = useSetRecoilState(queryAtom);
  const selectedLayout = useRecoilValue(selectedQAtom);

  const addSubModule = () => {
    const newObj = { id: `${Date.now() + Math.floor(Math.random() * 10000)}` };
    const newSubModule = [...subModules, newObj];
    setQAtom(pre => [...pre, newObj]);
    setSubModules(newSubModule);
  };

  const removeSubModule = id => {
    const updatedSubModules = subModules.filter(
      subModule => subModule.id !== id
    );
    setQAtom(updatedSubModules);
    setSubModules(updatedSubModules);
  };

  useEffect(() => {
    if (selectedLayout.length > 0) {
      setSubModules(selectedLayout);
    }
  }, [selectedLayout]);

  return (
    <aside className="sidenav">
      <div className="side-Titlehead">
        <h3>Queries</h3>
      </div>
      <hr />
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
            index={index}
          />
        ))}
      </div>
    </aside>
  );
}

export default Sidenav;
