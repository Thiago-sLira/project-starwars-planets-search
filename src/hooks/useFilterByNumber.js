import { useState } from 'react';

function useFilterByNumber() {
  const [showPlanets, setShowPlanets] = useState([]);

  const filterPlanetsByNumbers = ({ comparison, column, value }, array) => {
    const filteredPlanets = array.filter((planet) => {
      if (comparison === 'bigger than') {
        return Number(planet[column]) > Number(value);
      } if (comparison === 'smaller than') {
        return Number(planet[column]) < Number(value);
      }
      return Number(planet[column]) === Number(value);
    });
    setShowPlanets(filteredPlanets);
  };

  return {
    filterPlanetsByNumbers, showPlanets, setShowPlanets,
  };
}

export default useFilterByNumber;
