// import { useState } from 'react';

// function useUpdateColumnFilter() {
//   const columnArray = [
//     'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
//   ];
//   const [filterColumn, setFilterColumn] = useState(columnArray);
//   const [filtersUsed, setFiltersUsed] = useState([]);

//   const removeFilterColumn = (column, updatedFiltersUsed) => {
//     setFilterColumn([...filterColumn, column]);
//     setFiltersUsed(updatedFiltersUsed);
//   };

//   const updateFilterColumn = ({ comparison, column, value }) => {
//     setFilterColumn(filterColumn.filter((element) => element !== column));
//     setFiltersUsed([
//       ...filtersUsed,
//       {
//         column,
//         comparison,
//         value,
//       },
//     ]);
//   };
//   return {
//     filterColumn,
//     filtersUsed,
//     updateFilterColumn,
//     removeFilterColumn,
//     columnArray,
//     setFilterColumn,
//     setFiltersUsed,
//   };
// }

// export default useUpdateColumnFilter;
