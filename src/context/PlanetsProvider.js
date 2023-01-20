import { useMemo } from 'react';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { isLoading, errors, planetsData } = useFetch();

  const values = useMemo(() => ({
    isLoading, errors, planetsData,
  }), [isLoading, errors, planetsData]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;

export default PlanetsProvider;
