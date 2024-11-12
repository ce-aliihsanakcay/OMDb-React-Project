import React from "react";
import "./yearSelection.scss";

const FilterYear = ({ year, setYear }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1800 + 1 },
    (_, index) => currentYear - index
  );

  return (
    <div className="container_year_selection">
      <label>Year:</label>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select Year</option>
        {years.map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterYear;
