import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const {
    handleAddFilterClick, filterColumn, filtersUsed, handleRemoveFilterClick,
  } = useContext(PlanetsContext);
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
    setFilterInputs({
      columnFilter: filterColumn.length === 0 ? filterColumn[0] : filterColumn[1],
      comparisonFilter: 'maior que',
      valueFilter: 0,
    });
    handleAddFilterClick(filterInputs);
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
            value={ filterInputs.columnFilter }
            name="columnFilter"
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
          disabled={ filterColumn.length === 0 }
        >
          Filter
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
              onClick={ handleRemoveFilterClick }
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
