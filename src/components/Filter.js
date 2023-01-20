import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { filterPlanetsByNumbers } = useContext(PlanetsContext);
  const [filterInputs, setFilterInputs] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });

  const handleChange = ({ target }) => {
    setFilterInputs({
      ...filterInputs,
      [target.name]: target.value,
    });
  };

  const handleClickFilter = () => {
    filterPlanetsByNumbers({ ...filterInputs });
  };

  return (
    <section>
      <h3>Filtros</h3>
      <label htmlFor="filter-column">
        <select
          data-testid="column-filter"
          id="filter-column"
          onChange={ handleChange }
          value={ filterInputs.columnFilter }
          name="columnFilter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="filter-comparison">
        <select
          data-testid="comparison-filter"
          id="filter-comparison"
          onChange={ handleChange }
          value={ filterInputs.comparisonFilter }
          name="comparisonFilter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="filter-value">
        <input
          id="filter-value"
          type="number"
          value={ filterInputs.valueFilter }
          name="valueFilter"
          onChange={ handleChange }
          data-testid="value-filter"
          min={ 0 }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilter }
      >
        Filter
      </button>
    </section>
  );
}

export default Filter;
