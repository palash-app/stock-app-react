import React, { useEffect, useState } from "react";

const StepParser = ({ query }) => {
  const [elements, setElements] = useState([]);
  const elementHeight = "20px";
  const elementMinWidth = 4;
  var currElements = [];

  const handleChange = (event, index) => {
    const elementsAvailable = [...currElements]; // Copy the current inputs array
    var eventElement = elementsAvailable[index];
    var tempToAdd = "";
    var updateValue = event.target.value;
    if (eventElement.props.children.type === "input") {
      tempToAdd = (
        <span style={{ color: "blue" }}>
          <input
            key={index}
            type={`${event.target.type}`}
            value={updateValue}
            onChange={(e) => {
              handleChange(e, index);
            }}
            style={{
              height: `${elementHeight}`,
              width: `${updateValue.length + elementMinWidth}ch`,
            }}
          />
        </span>
      );
    } else if (eventElement.props.children.type === "select") {
      tempToAdd = (
        <span style={{ color: "blue" }}>
          <select
            key={index}
            value={updateValue}
            onChange={(e) => {
              handleChange(e, index);
            }}
            className="select"
            style={{ height: `${elementHeight}` }}
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
        </span>
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
              <span style={{ color: "blue" }}>
                <input
                  key={i}
                  type="text"
                  value={value}
                  onChange={(e) => {
                    handleChange(e, i);
                  }}
                  style={{
                    height: `${elementHeight}`,
                    width: `${value.length + elementMinWidth}ch`,
                  }}
                  placeholder={`${opts}`}
                />
              </span>
            );
          } else if (opts[0] === "<number>") {
            tempToAdd = (
              <span style={{ color: "blue" }}>
                <input
                  key={i}
                  type="number"
                  value={value}
                  onChange={(e) => {
                    handleChange(e, i);
                  }}
                  style={{
                    height: `${elementHeight}`,
                    width: `${value.length + elementMinWidth}ch`,
                  }}
                  placeholder={`${opts}`}
                />
              </span>
            );
          } else if (opts.length > 1) {
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
        <>{element}</>
      ))}
    </div>
  );
};

export default StepParser;
