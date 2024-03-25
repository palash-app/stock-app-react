import React, { useEffect, useState } from "react";

const StepParser = ({ query }) => {
  const [elements, setElements] = useState([]);
  var currElements = [];

  const handleChange = (event, index) => {
    const elementsAvailable = [...currElements]; // Copy the current inputs array
    var eventElement = elementsAvailable[index];
    var tempToAdd = "";
    var updateValue = event.target.value;
    if (eventElement.type === "input") {
      tempToAdd = (
        <input
          key={index}
          type={`${event.target.type}`}
          value={updateValue}
          onChange={(e) => {
            handleChange(e, index);
          }}
          style={{ width: `${updateValue.length + 4}ch` }}
        />
      );
    } else if (eventElement.type === "select") {
      tempToAdd = (
        <select
          key={index}
          value={updateValue}
          onChange={(e) => {
            handleChange(e, index);
          }}
          className="select"
        >
          {Array.from(event.target.options).map((item) =>
            item.text === event.target.value ? (
              <option key={item.text} value={item.text} selected>
                {item.text}
              </option>
            ) : (
              <option key={item.text} value={item.text}>
                {item.text}
              </option>
            )
          )}
        </select>
      );
    }
    elementsAvailable[index] = tempToAdd;
    currElements = elementsAvailable;
    setElements(elementsAvailable);
  };

  // Parse the user selection and allow user to refine choice
  useEffect(() => {
    const parts = query.str.split(" ");
    const options = query.obj.variables;
    var elementsToAdd = [];
    for (let i = 0; i < parts.length; i++) {
      var tempToAdd = "";
      let value = parts[i];
      if (options.hasOwnProperty(i)) {
        if (options[i].includes(value)) {
          let opts = options[i];
          if (opts[0] === "<list>" || opts[0] === "<word>") {
            tempToAdd = (
              <input
                key={i}
                type="text"
                value={value}
                onChange={(e) => {
                  handleChange(e, i);
                }}
                style={{ width: `${value.length + 1}ch` }}
                placeholder={`${opts}`}
              />
            );
          } else if (opts[0] === "<number>") {
            tempToAdd = (
              <input
                key={i}
                type="number"
                value={value}
                onChange={(e) => {
                  handleChange(e, i);
                }}
                style={{ width: `${value.length + 1}ch` }}
                placeholder={`${opts}`}
              />
            );
          } else if (opts.length > 1) {
            tempToAdd = (
              <select
                key={i}
                value={value}
                onChange={(e) => {
                  handleChange(e, i);
                }}
              >
                {opts.map((item) =>
                  item === value ? (
                    <option key={item} value={item} selected>
                      {item}
                    </option>
                  ) : (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            );
          } else {
            throw new Error("This should not happen");
          }
        }
      } else {
        tempToAdd = <p type="constant">{value}</p>;
      }
      elementsToAdd.push(tempToAdd);
    }
    currElements = [...elementsToAdd];
    setElements(elementsToAdd);
  }, []);

  return (
    <div className="children">
      {elements.map((element, index) => (
        <div key={index}>{element}</div>
      ))}
    </div>
  );
};

export default StepParser;
