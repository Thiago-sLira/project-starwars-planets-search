import { useState } from 'react';

function useUpdateColumnFilter() {
  const [filterColumn, setFilterColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filtersUsed, setFiltersUsed] = useState([]);

  const removeFilterColumn = (column, updatedFiltersUsed) => {
    setFilterColumn([...filterColumn, column]);
    setFiltersUsed(updatedFiltersUsed);
  };

  const updateFilterColumn = ({ comparisonFilter, columnFilter, valueFilter }) => {
    setFilterColumn(filterColumn.filter((column) => column !== columnFilter));
    setFiltersUsed([
      ...filtersUsed,
      {
        column: columnFilter,
        comparison: comparisonFilter,
        value: valueFilter,
      },
    ]);
  };
  return {
    filterColumn, filtersUsed, updateFilterColumn, removeFilterColumn,
  };
}

export default useUpdateColumnFilter;
