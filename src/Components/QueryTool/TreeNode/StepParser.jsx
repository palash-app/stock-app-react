import React, { useEffect, useState } from "react";

const StepParser = ({ query }) => {
  const [elements, setElements] = useState([]);
  const elementHeight = "20px";
  const elementMinWidth = 4;
  const inputTemplate = (index, type, value, handleChange) => {
    return (
      <span style={{ color: "blue" }}>
        <input
          key={index}
          type={`${type}`}
          value={value}
          onChange={(e) => {
            handleChange(e, index);
          }}
          style={{
            height: `${elementHeight}`,
            width: `${value.length + elementMinWidth}ch`,
          }}
        />
      </span>
    );
  };
  const selectionTemplate = (index, value, options, handleChange) => {
    return (
      <span style={{ color: "blue" }}>
        <select
          key={index}
          value={value}
          onChange={(e) => {
            handleChange(e, index);
          }}
          className="select"
          style={{ height: `${elementHeight}` }}
        >
          {options.map((item) => (
            <React.Fragment key={item}>
              <option value={item}>{item}</option>
            </React.Fragment>
          ))}
        </select>
      </span>
    );
  };

  var currElements = [];

  const handleChange = (event, index) => {
    const elementsAvailable = [...currElements]; // Copy the current inputs array
    var eventElement = elementsAvailable[index];
    var tempToAdd = "";
    var updateValue = event.target.value;
    if (eventElement.props.children.type === "input") {
      tempToAdd = inputTemplate(
        index,
        event.target.type,
        updateValue,
        handleChange
      );
    } else if (eventElement.props.children.type === "select") {
      let options = Array.from(event.target.options).map((item) => item.text);
      tempToAdd = selectionTemplate(index, updateValue, options, handleChange);
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
            tempToAdd = inputTemplate(i, "text", value, handleChange);
          } else if (opts[0] === "<number>") {
            tempToAdd = inputTemplate(i, "number", value, handleChange);
          } else if (opts.length > 1) {
            tempToAdd = selectionTemplate(i, value, opts, handleChange);
            tempToAdd = (
              <span style={{ color: "blue" }}>
                <select
                  key={i}
                  value={value}
                  onChange={(e) => {
                    handleChange(e, i);
                  }}
                  style={{ height: `${elementHeight}` }}
                >
                  {opts.map((item) => (
                    <React.Fragment key={item}>
                      <option value={item}>{item}</option>
                    </React.Fragment>
                  ))}
                </select>
              </span>
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
        <>
          <React.Fragment key={index}>{element}</React.Fragment>
        </>
      ))}
    </div>
  );
};

export default StepParser;
