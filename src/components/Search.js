import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PlanetsContext from '../context/PlanetsContext';

function Search() {
  const { setFilterByName, filterByName } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    setFilterByName(value);
  };

  return (
    <div>
      <Box htmlFor="search-planets-input">
        <TextField
          id="search-planets-input"
          type="text"
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
