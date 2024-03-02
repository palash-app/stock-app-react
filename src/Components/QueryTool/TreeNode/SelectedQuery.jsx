import React, { useEffect, useState } from "react";

const SelectedQuery = ({ query, changeQuery, idx }) => {
  const [qvalue, setQvalue] = useState([]);

  // Use useEffect with a dependency on query.statement to update qvalue
  useEffect(() => {
    setQvalue(query.statement.split(" "));
  }, [query.statement]);

  const handleChange = (e, index) => {
    qvalue[index] = e.target.value;
    const str = qvalue.join(" ");
    changeQuery(str, idx);
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
              value={str} // Use the value attribute to control the input
              onChange={e => {
                handleChange(e, index);
              }}
            />
          );
        }
        if (
          query.obj.variables[index] &&
          query.obj.variables[index].includes("<list>")
        ) {
          return (
            <input
              key={index}
              type="text"
              value={str} // Use the value attribute to control the input
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
