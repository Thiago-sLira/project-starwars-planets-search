import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Search() {
  const { setFilterByName, filterByName } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    setFilterByName(value);
  };

  return (
    <div>
      <label htmlFor="search-planets-input">
        <h3>Project StarWars Planets</h3>
        <input
          type="search-planets-input"
          value={ filterByName }
          name="filterByName"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default Search;
