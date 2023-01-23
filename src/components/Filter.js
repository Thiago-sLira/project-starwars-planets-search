import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const {
    handleAddFilterClick, filterColumn, filtersUsed, handleRemoveFilterClick,
    handleRemoveAllFilters,
  } = useContext(PlanetsContext);
  const [filterInputs, setFilterInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target }) => {
    setFilterInputs({
      ...filterInputs,
      [target.name]: target.value,
    });
  };

  const handleClickFilter = () => {
    setFilterInputs({
      column: filterColumn[filterColumn.length - 1],
      comparison: 'maior que',
      value: 0,
    });
    handleAddFilterClick(filterInputs);
  };

  const hadleRemoveClick = ({ target: { name: column } }) => {
    handleRemoveFilterClick(column);
    setFilterInputs({
      column: filterColumn[filterColumn.length - 1],
      comparison: 'maior que',
      value: 0,
    });
  };

  return (
    <div>
      <section>
        <h3>Filtros</h3>
        <label htmlFor="filter-column">
          <select
            data-testid="column-filter"
            id="filter-column"
            onChange={ handleChange }
            value={ filterInputs.column }
            name="column"
          >
            { filterColumn.length !== 0 && filterColumn.map((column, index) => (
              <option key={ index } value={ column }>{column}</option>
            )) }
          </select>
        </label>
        <label htmlFor="filter-comparison">
          <select
            data-testid="comparison-filter"
            id="filter-comparison"
            onChange={ handleChange }
            value={ filterInputs.comparison }
            name="comparison"
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
            value={ filterInputs.value }
            name="value"
            onChange={ handleChange }
            data-testid="value-filter"
            min={ 0 }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClickFilter }
          disabled={ filterColumn.length === 0 }
        >
          Filter
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemoveAllFilters }
        >
          Remover todas filtragens
        </button>
      </section>
      <ul>
        { filtersUsed.length !== 0
        && filtersUsed.map(({ column, comparison, value }, index) => (
          <li key={ index } data-testid="filter">
            <p>{ `${column} ${comparison} ${value}` }</p>
            <button
              type="button"
              name={ column }
              onClick={ hadleRemoveClick }
            >
              X
            </button>
          </li>
        )) }
      </ul>
    </div>
  );
}

export default Filter;
