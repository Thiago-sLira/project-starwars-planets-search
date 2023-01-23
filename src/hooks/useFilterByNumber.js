import { useState } from 'react';

function useFilterByNumber() {
  const [showPlanets, setShowPlanets] = useState([]);

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
    setShowPlanets(filteredPlanets);
  };

  return {
    filterPlanetsByNumbers, showPlanets, setShowPlanets,
  };
}

export default useFilterByNumber;
