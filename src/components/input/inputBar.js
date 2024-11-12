import React from "react";
import "./inputBar.scss";

const InputBar = ({ inputValue, setInputValue }) => {
  return (
    <div className="input-bar">
      <label>Search Input:</label>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default InputBar;
