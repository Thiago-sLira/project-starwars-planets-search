/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useFilterByNumber from '../hooks/useFilterByNumber';
import useUpdateColumnFilter from '../hooks/useUpdateColumnFilter';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { isLoading, errors, planetsData } = useFetch();
  const {
    filterColumn, filtersUsed, updateFilterColumn, removeFilterColumn,
  } = useUpdateColumnFilter();
  const [filterByName, setFilterByName] = useState('');
  const { filterPlanetsByNumbers, showPlanets, setShowPlanets } = useFilterByNumber();

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

  const handleRemoveFilterClick = ({ target: { name: column } }) => {
    const updatedFiltersUsed = filtersUsed.filter((filter) => filter.column !== column);
    removeFilterColumn(column, updatedFiltersUsed);
    setShowPlanets(planetsData);
    if (updatedFiltersUsed.length !== 0) {
      updatedFiltersUsed.forEach((filters) => {
        filterPlanetsByNumbers(filters, showPlanets);
      });
    }
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
  }), [isLoading, errors, filterByName, showPlanets]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;

export default PlanetsProvider;
