/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useFilterByNumbers from '../hooks/useFilterByNumbers';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { isLoading, errors, planetsData } = useFetch();
  const { filterColumn, filtersUsed, updateFilterColumn } = useFilterByNumbers();
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

  const filterPlanetsByNumbers = ({ comparisonFilter, columnFilter, valueFilter }) => {
    updateFilterColumn(comparisonFilter, columnFilter, valueFilter);
    const filteredPlanets = showPlanets.filter((planet) => {
      if (comparisonFilter === 'maior que') {
        return Number(planet[columnFilter]) > Number(valueFilter);
      } if (comparisonFilter === 'menor que') {
        return Number(planet[columnFilter]) < Number(valueFilter);
      }
      return Number(planet[columnFilter]) === Number(valueFilter);
    });
    setShowPlanets(filteredPlanets);
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
    filterPlanetsByNumbers,
    filterColumn,
    filtersUsed,
  }), [isLoading, errors, filterByName, showPlanets]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;

export default PlanetsProvider;
