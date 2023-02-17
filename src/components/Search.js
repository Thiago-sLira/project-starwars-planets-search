import React, { useContext } from 'react';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Paper from '@mui/material/Paper';
// import SearchIcon from '@mui/icons-material/Search';
// import IconButton from '@mui/material/IconButton';
// import InputBase from '@mui/material/InputBase';
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
        {/* <Paper
          component="form"
          sx={ { p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 } }
          className="paper-search"
        >
          <InputBase
            sx={ { ml: 1, flex: 1 } }
            placeholder="Search Planets By Name"
            onChange={ handleChange }
          />
          <IconButton type="button" sx={ { p: '10px' } } aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper> */}
      </Box>
    </div>
  );
}

export default Search;
