/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useUpdateColumnFilter from '../hooks/useUpdateColumnFilter';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { isLoading, errors, planetsData } = useFetch();
  const {
    filterColumn, filtersUsed, updateFilterColumn, removeFilterColumn,
  } = useUpdateColumnFilter();
  const [filterByName, setFilterByName] = useState('');
  const [showPlanets, setShowPlanets] = useState([]);

  const filterPlanetsByName = () => {
    if (filterByName.length === 0) {
      setShowPlanets(planetsData);
    } else {
      const filteredPlanets = planetsData.filter(({ name }) => (
        name.toLowerCase().includes(filterByName.toLowerCase())));
      setShowPlanets(filteredPlanets);
    }
  };

  const filterPlanetsByNumbers = ({
    comparisonFilter, columnFilter, valueFilter,
  }, array = []) => {
    const filteredPlanets = array.filter((planet) => {
      if (comparisonFilter === 'maior que') {
        return Number(planet[columnFilter]) > Number(valueFilter);
      } if (comparisonFilter === 'menor que') {
        return Number(planet[columnFilter]) < Number(valueFilter);
      }
      return Number(planet[columnFilter]) === Number(valueFilter);
    });
    return filteredPlanets;
  };

  const handleAddFilterClick = (filterInputs) => {
    setShowPlanets(filterPlanetsByNumbers(filterInputs, showPlanets));
    updateFilterColumn(filterInputs);
  };

  const handleRemoveFilterClick = ({ target: { name: column } }) => {
    const updatedFiltersUsed = filtersUsed.filter((filter) => filter.column !== column);
    removeFilterColumn(column, updatedFiltersUsed);
    updatedFiltersUsed.forEach((filters) => {
      setShowPlanets(filterPlanetsByNumbers(filters, planetsData));
    });
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
