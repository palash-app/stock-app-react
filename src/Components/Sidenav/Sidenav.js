import React, { useEffect, useState } from "react";
import "./Sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import QueryTool from "../QueryTool/QueryTool";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { queryAtom, selectedQAtom } from "../../utils/state";

// const preVal = [
//   {
//     id: "1709575049852",
//     given: [
//       {
//         id: "1709575049859",
//         str: "week close ema 15 < close",
//         obj: {
//           regex: "^(\\w+) (\\w+) (\\w+) (\\d+) ([><=!]+) (\\w+)$",
//           statements: [
//             "day close ema <number> > close",
//             "week close ema <number> > close",
//             "hour close ema <number> > close",
//           ],
//           variables: {
//             0: ["day", "week", "hour"],
//             1: ["close", "open", "high", "low"],
//             2: ["ema", "ma"],
//             3: ["<number>"],
//             4: [">", "<", "!=", "==", ">=", "<="],
//             5: ["close", "open", "high", "low"],
//           },
//         },
//       },
//     ],
//     when: [],
//     then: [],
//   },
//   {
//     id: "1709575049850",
//     given: [
//       {
//         id: "1709575049859",
//         str: "week close ema 15 < close",
//         obj: {
//           regex: "^(\\w+) (\\w+) (\\w+) (\\d+) ([><=!]+) (\\w+)$",
//           statements: [
//             "day close ema <number> > close",
//             "week close ema <number> > close",
//             "hour close ema <number> > close",
//           ],
//           variables: {
//             0: ["day", "week", "hour"],
//             1: ["close", "open", "high", "low"],
//             2: ["ema", "ma"],
//             3: ["<number>"],
//             4: [">", "<", "!=", "==", ">=", "<="],
//             5: ["close", "open", "high", "low"],
//           },
//         },
//       },
//     ],
//     when: [],
//     then: [],
//   },
// ];

const preVal = [];
function Sidenav() {
  const [subModules, setSubModules] = useState([]);
  const [qAtom, setQAtom] = useRecoilState(queryAtom);
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
