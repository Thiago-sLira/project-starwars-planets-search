import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import PlanetsContext from '../context/PlanetsContext';

function Search() {
  const { setFilterByName, filterByName } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    setFilterByName(value);
  };

  return (
    <div>
      <Box
        component="form"
        sx={ {
          '& > :not(style)': { m: 1, width: '25ch' },
        } }
        noValidate
        autoComplete="off"
      >
        <input
          id="filled-search"
          label="Search field"
          type="search"
          // variant="standard"
          value={ filterByName }
          name="filterByName"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </Box>
    </div>
  );
}

export default Search;
