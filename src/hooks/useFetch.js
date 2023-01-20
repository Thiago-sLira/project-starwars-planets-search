import { useEffect, useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [planetsData, setPlanetsData] = useState([]);

  const makeFetch = () => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then(({ results }) => {
        results.forEach((planet) => {
          delete planet.residents;
        });
        setPlanetsData(results);
      })
      .catch((error) => setErrors(error))
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    makeFetch();
  }, []);

  return {
    isLoading, errors, planetsData,
  };
}

export default useFetch;
