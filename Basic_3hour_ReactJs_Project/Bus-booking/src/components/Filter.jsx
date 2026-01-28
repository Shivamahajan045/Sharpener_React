import React from "react";

function Filter({ filterBus, handleSelectChange }) {
  return (
    <div className="filter">
      <label>Filter by Bus:</label>
      <select value={filterBus} onChange={handleSelectChange}>
        <option value="ALL">All</option>
        <option value="Bus 1">Bus 1</option>
        <option value="Bus 2">Bus 2</option>
        <option value="Bus 3">Bus 3</option>
      </select>
    </div>
  );
}

export default Filter;
