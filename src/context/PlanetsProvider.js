/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { isLoading, errors, planetsData } = useFetch();
  const [filterByName, setFilterByName] = useState('');
  const [showPlanets, setShowPlanets] = useState([]);

  const filterPlanetsByName = () => {
    if (filterByName.length === 0) {
      setShowPlanets(planetsData);
    } else {
      const filter = planetsData.filter(({ name }) => (
        name.toLowerCase().includes(filterByName.toLowerCase())));
      setShowPlanets(filter);
    }
  };

  useEffect(() => {
    filterPlanetsByName();
  }, [filterByName]);

  const values = useMemo(() => ({
    isLoading, errors, showPlanets, setFilterByName, filterByName,
  }), [isLoading, errors, filterByName, showPlanets]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;

export default PlanetsProvider;
