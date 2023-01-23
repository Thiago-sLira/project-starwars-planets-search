import { useState } from 'react';

function useFilterByNumbers() {
  const [filterColumn, setFilterColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filtersUsed, setFiltersUsed] = useState([]);

  const updateFilterColumn = (comparisonFilter, columnFilter, valueFilter) => {
    setFilterColumn(
      filterColumn.filter((column) => column !== columnFilter),
    );
    setFiltersUsed([
      ...filtersUsed,
      `${columnFilter} ${comparisonFilter} ${valueFilter}`,
    ]);
  };
  return {
    filterColumn, filtersUsed, updateFilterColumn,
  };
}

export default useFilterByNumbers;
