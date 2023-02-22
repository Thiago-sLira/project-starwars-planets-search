/* eslint-disable max-lines */
import React, { useState, useContext, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import PlanetsContext from '../context/PlanetsContext';

const biggerThan = 'bigger than';
function Filter() {
  const {
    handleAddFilterClick, filterColumn, filtersUsed, handleRemoveFilterClick,
    handleRemoveAllFilters, columnArray, handleSortClick,
  } = useContext(PlanetsContext);
  const [filterInputs, setFilterInputs] = useState({
    column: 'population',
    comparison: biggerThan,
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
      comparison: biggerThan,
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
      comparison: 'bigger than',
      value: 0,
    });
  };

  return (
    <div>
      <h1>Filters</h1>
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
        <FormControl sx={ { m: 1 } }>
          <InputLabel
            htmlFor="filter-comparison"
            variant="standard"
            color="warning"
            sx={ {
              color: '#f3e3f5',
            } }
          >
            Comparison
          </InputLabel>
          <NativeSelect
            labelId="filter-comparison"
            data-testid="comparison-filter"
            id="filter-comparison"
            onChange={ handleChangeFilter }
            value={ filterInputs.comparison }
            inputProps={ {
              name: 'comparison',
              id: 'filter-comparison',
            } }
            name="comparison"
            sx={ {
              color: 'white',
            } }
          >
            <option
              value={ biggerThan }
              style={ {
                backgroundColor: 'black',
              } }
            >
              bigger than
            </option>
            <option
              value="smaller than"
              style={ {
                backgroundColor: 'black',
              } }
            >
              smaller than
            </option>
            <option
              value="equal to"
              style={ {
                backgroundColor: 'black',
              } }
            >
              equal to
            </option>
          </NativeSelect>
        </FormControl>
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
        <Button
          type="button"
          data-testid="button-filter"
          onClick={ handleClickFilter }
          disabled={ filterColumn.length === 0 }
          variant="outlined"
          sx={ {
            border: '3px solid yellow',
            color: 'yellow',
          } }
        >
          Filter
        </Button>
        <FormControl sx={ { m: 1 } }>
          <InputLabel
            htmlFor="sort-column"
            variant="standard"
            color="secondary"
            sx={ {
              color: '#f3e3f5',
            } }
          >
            SortColumn
          </InputLabel>
          <NativeSelect
            labelId="sort-column"
            data-testid="column-sort"
            id="sort-column"
            onChange={ handleChangeOrder }
            value={ order.column }
            inputProps={ {
              name: 'column',
              id: 'sort-column',
            } }
            name="column"
            sx={ {
              color: 'white',
            } }
          >
            { columnArray.map((column, index) => (
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
        <RadioGroup htmlFor="sort-radios">
          Ascending
          <Radio
            className="radios-sort"
            type="radio"
            data-testid="column-sort-input-asc"
            id="sort-radios"
            onChange={ handleChangeOrder }
            value="ASC"
            name="sort"
            color="success"
            sx={ {
              color: '#f3e3f5',
            } }
          />
          Descending
          <Radio
            className="radios-sort"
            type="radio"
            data-testid="column-sort-input-desc"
            id="sort-radios"
            onChange={ handleChangeOrder }
            value="DESC"
            name="sort"
            color="warning"
            sx={ {
              color: '#f3e3f5',
            } }
          />
        </RadioGroup>
        <Button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleSortClick(order) }
          variant="outlined"
          sx={ {
            border: '3px solid yellow',
            color: 'yellow',
          } }
        >
          Sort
        </Button>
      </section>
      <br />
      <Button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
        variant="outlined"
        sx={ {
          border: '2px solid yellow',
          color: 'yellow',
        } }
      >
        Remove all Filters
      </Button>
      <ul>
        { filtersUsed.length !== 0
        && filtersUsed.map(({ column, comparison, value }, index) => (
          <li key={ index } data-testid="filter">
            <spam className="spam">{ `${column} ${comparison} ${value}` }</spam>
            {' '}
            <Button
              type="button"
              name={ column }
              onClick={ hadleRemoveClick }
              data-testid={ `remove-filter-${column}` }
              variant="outlined"
              sx={ {
                border: '1px solid yellow',
                color: 'yellow',
              } }
            >
              X
            </Button>
          </li>
        )) }
      </ul>
    </div>
  );
}

export default Filter;
