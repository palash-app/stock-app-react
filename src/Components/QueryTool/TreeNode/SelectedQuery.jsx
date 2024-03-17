import React, { useEffect, useState } from "react";

const SelectedQuery = ({ query, changeQuery, idx }) => {
  const [qvalue, setQvalue] = useState([]);

  // Use useEffect with a dependency on query.str to update qvalue
  useEffect(() => {
    setQvalue(query.str.split(" "));
  }, [query.str]);

  const handleChange = (e, index) => {
    // Create a copy of qvalue
    const updatedQvalue = [...qvalue];
    updatedQvalue[index] = e.target.value;
    // Use the updatedQvalue to construct the new string
    const str = updatedQvalue.join(" ");
    // Call changeQuery with the new string
    changeQuery(str, query.id);
    // Update the state with the modified array
    setQvalue(updatedQvalue);
  };

  const getInputWidth = value => {
    let length = value.length;
    if (value == "<number>") {
      length = 1;
    }
    return Math.max(3, length * 0.9);
  };

  return (
    <div className="children">
      {qvalue.map((str, index) => {
        if (
          query.obj.variables[index] &&
          query.obj.variables[index].includes("<number>")
        ) {
          return (
            <input
              key={index}
              type="number"
              min={10}
              value={str}
              style={{ width: getInputWidth(str) + "rem" }}
              onChange={e => {
                handleChange(e, index);
              }}
            />
          );
        }
        if (
          query.obj.variables[index] &&
          (query.obj.variables[index].includes("<list>") || query.obj.variables[index].includes("<word>"))
        ) {
          return (
            <input
              key={index}
              type="text"
              value={str}
              style={{ width: getInputWidth(str) + "rem" }}
              onChange={e => {
                handleChange(e, index);
              }}
            />
          );
        } else if (query.obj.variables[index]) {
          return (
            <select
              name="variables"
              id="variable"
              key={index}
              value={str} // Use the value attribute to control the select
              onChange={e => handleChange(e, index)}
            >
              {query.obj.variables[index].map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          );
        } else {
          return <span style={{ marginLeft: "5px" }}>{str}</span>;
        }
      })}
    </div>
  );
};

export default SelectedQuery;
