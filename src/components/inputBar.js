import React from "react";

const InputBar = ({ inputValue, setInputValue }) => {
  return (
    <label>
      Search Input:
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </label>
  );
};

export default InputBar;
