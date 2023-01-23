/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useFilterByNumber from '../hooks/useFilterByNumber';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const columnArray = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const { isLoading, errors, planetsData } = useFetch();
  const { filterPlanetsByNumbers, showPlanets, setShowPlanets } = useFilterByNumber();
  const [filterColumn, setFilterColumn] = useState(columnArray);
  const [filtersUsed, setFiltersUsed] = useState([]);
  const [filterByName, setFilterByName] = useState('');

  const removeFilterColumn = (column, updatedFiltersUsed) => {
    setFilterColumn([...filterColumn, column]);
    setFiltersUsed(updatedFiltersUsed);
  };

  const updateFilterColumn = ({ comparison, column, value }) => {
    setFilterColumn(filterColumn.filter((element) => element !== column));
    setFiltersUsed([
      ...filtersUsed,
      {
        column,
        comparison,
        value,
      },
    ]);
  };

  const filterPlanetsByName = () => {
    if (filterByName.length === 0) {
      setShowPlanets(planetsData);
    } else {
      const filteredPlanets = planetsData.filter(({ name }) => (
        name.toLowerCase().includes(filterByName.toLowerCase())));
      setShowPlanets(filteredPlanets);
    }
  };

  const handleAddFilterClick = (filterInputs) => {
    filterPlanetsByNumbers(filterInputs, showPlanets);
    updateFilterColumn(filterInputs);
  };

  const handleRemoveFilterClick = (column) => {
    setShowPlanets(planetsData);
    const updatedFiltersUsed = filtersUsed.filter((filter) => filter.column !== column);
    removeFilterColumn(column, updatedFiltersUsed);
  };

  useEffect(() => {
    filtersUsed.forEach((filters) => {
      filterPlanetsByNumbers(filters, showPlanets);
    });
  }, [filtersUsed]);

  const handleRemoveAllFilters = () => {
    setShowPlanets(planetsData);
    setFilterColumn(columnArray);
    setFiltersUsed([]);
  };

  useEffect(() => {
    filterPlanetsByName();
  }, [filterByName, planetsData]);

  const values = useMemo(() => ({
    isLoading,
    errors,
    showPlanets,
    setFilterByName,
    filterByName,
    handleAddFilterClick,
    filterColumn,
    filtersUsed,
    handleRemoveFilterClick,
    handleRemoveAllFilters,
  }), [isLoading, errors, filterByName, showPlanets]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;

export default PlanetsProvider;
