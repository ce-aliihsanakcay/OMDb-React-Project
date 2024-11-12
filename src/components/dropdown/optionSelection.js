import React from "react";
import "./optionSelection.scss";

const FilterSelection = ({ optionList, option, setOption }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={"option-selection"}>
      <label>Type: </label>
      <select value={option} onChange={(e) => setOption(e.target.value)}>
        <option value="">Select Type</option>
        {optionList.map((o, index) => (
          <option key={index} value={o}>
            {capitalizeFirstLetter(o)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelection;
