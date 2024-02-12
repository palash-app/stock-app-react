import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./autocomplete.css";

const AutocompleteInput = ({ addQuery, queries }) => {
  const [options, setOption] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const testInput = useRef();

  useEffect(() => {
    const arr = queries.map(item => item.statements).flat();
    setOption(arr);
  }, []);

  const handleInputChange = e => {
    let value = e.target.value;
    if (value !== "") {
      const arr = options.filter(item => item.startsWith(value));
      setFilteredOptions(arr);
    } else {
      setFilteredOptions([]);
    }
    setInputValue(value);
  };

  const handleOptionClick = option => {
    const selectedArr = queries.filter(item =>
      item.statements.some(statement => statement === option)
    );
    addQuery(selectedArr[0], option);
    setInputValue("");
    setFilteredOptions([]);
  };

  return (
    <div className="autocomplete-container">
      <input
        ref={testInput}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
        className="form-control rounded-0"
      />
      {filteredOptions.length > 0 && (
        <ul className="autocomplete-suggestions list-group">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="list-group-item"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
