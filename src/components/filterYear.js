import React from "react";

const FilterYear = ({ year, setYear }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1800 + 1 },
    (_, index) => currentYear - index
  );

  return (
    <label>
      Year: 
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select Year</option>
        {years.map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FilterYear;
