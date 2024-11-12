import React from "react";

const FilterSelection = ({ optionList, option, setOption }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <label>
      Type:
      <select value={option} onChange={(e) => setOption(e.target.value)}>
        <option value="">Select Type</option>
        {optionList.map((o, index) => (
          <option key={index} value={o}>
            {capitalizeFirstLetter(o)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FilterSelection;
