import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./autocomplete.css";

const AutocompleteInput = ({ addQuery, queries }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const testInput = useRef();
  const suggestionsRef = useRef();

  const handleFocus = () => {
    setIsFocused(true);
    // Additional logic you want to execute when input is focused
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Additional logic you want to execute when input is blurred
  };

  useEffect(() => {
    const arr = queries.map(item => item.statements).flat();
    setOptions(arr);
  }, [queries]);

  useEffect(() => {
    if (selectedOptionIndex !== -1 && suggestionsRef.current) {
      const selectedElement =
        suggestionsRef.current.childNodes[selectedOptionIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedOptionIndex]);

  const handleInputChange = e => {
    let value = e.target.value;
    if (value !== "") {
      const arr = options.filter(item => item.startsWith(value));
      setFilteredOptions(arr);
    } else {
      setFilteredOptions([]);
    }
    setInputValue(value);
    setSelectedOptionIndex(-1);
  };

  const handleOptionClick = option => {
    const selectedArr = queries.filter(item =>
      item.statements.some(statement => statement === option)
    );
    addQuery(selectedArr[0], option);
    setInputValue("");
    setFilteredOptions([]);
  };

  const handleKeyDown = e => {
    if (filteredOptions.length === 0) return;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setSelectedOptionIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedOptionIndex(prevIndex =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedOptionIndex !== -1) {
          handleOptionClick(filteredOptions[selectedOptionIndex]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="autocomplete-container">
      <input
        ref={testInput}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Type to search..."
        className="form-control rounded-0"
      />
      {isFocused && filteredOptions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="autocomplete-suggestions list-group"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`list-group-item ${
                index === selectedOptionIndex ? "current-option" : ""
              }`}
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
