import React, { useState, useContext, useEffect } from 'react';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const {
    handleAddFilterClick, filterColumn, filtersUsed, handleRemoveFilterClick,
    handleRemoveAllFilters, columnArray, handleSortClick,
  } = useContext(PlanetsContext);
  const [filterInputs, setFilterInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [order, setOrder] = useState({
    column: 'population', sort: 'ASC',
  });

  const handleChangeFilter = ({ target }) => {
    setFilterInputs({
      ...filterInputs,
      [target.name]: target.value,
    });
  };

  const handleChangeOrder = ({ target }) => {
    setOrder({
      ...order,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    setFilterInputs({
      column: filterColumn[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [filterColumn]);

  const handleClickFilter = () => {
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
      <h1>Filtros</h1>
      <section className="filters-numbers">
        <FormControl sx={ { m: 1 } }>
          <InputLabel
            htmlFor="demo-customized-select-label"
            variant="standard"
            color="warning"
            sx={ {
              color: '#f3e3f5',
            } }
          >
            Column
          </InputLabel>
          <NativeSelect
            labelId="demo-customized-select-label"
            data-testid="column-filter"
            id="demo-customized-select"
            onChange={ handleChangeFilter }
            value={ filterInputs.column }
            inputProps={ {
              name: 'column',
              id: 'demo-customized-select-label',
            } }
            name="column"
            sx={ {
              color: 'white',
            } }
          >
            { filterColumn.length !== 0 && filterColumn.map((column, index) => (
              <option
                key={ index }
                value={ column }
                style={ {
                  backgroundColor: 'black',
                } }
              >
                {column}
              </option>
            )) }
          </NativeSelect>
        </FormControl>
        <label htmlFor="filter-comparison">
          <select
            data-testid="comparison-filter"
            id="filter-comparison"
            onChange={ handleChangeFilter }
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
            onChange={ handleChangeFilter }
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
        <label htmlFor="sort-column">
          <select
            data-testid="column-sort"
            id="sort-column"
            onChange={ handleChangeOrder }
            value={ order.column }
            name="column"
          >
            { columnArray.map((column, index) => (
              <option key={ index } value={ column }>{column}</option>
            )) }
          </select>
        </label>
        <label htmlFor="sort-radios">
          Ascendente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            id="sort-radios"
            onChange={ handleChangeOrder }
            value="ASC"
            name="sort"
          />
          Descendente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            id="sort-radios"
            onChange={ handleChangeOrder }
            value="DESC"
            name="sort"
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleSortClick(order) }
        >
          Ordenar
        </button>
      </section>
      <br />
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover todas filtragens
      </button>
      <ul>
        { filtersUsed.length !== 0
        && filtersUsed.map(({ column, comparison, value }, index) => (
          <li key={ index } data-testid="filter">
            <p>{ `${column} ${comparison} ${value}` }</p>
            <button
              type="button"
              name={ column }
              onClick={ hadleRemoveClick }
              data-testid={ `remove-filter-${column}` }
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
