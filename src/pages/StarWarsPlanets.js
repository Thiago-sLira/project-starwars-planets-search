import React from 'react';
import Box from '@mui/material/Box';
import Filter from '../components/Filter';
import Search from '../components/Search';
import Table from '../components/Table';

function StarWarsPlanets() {
  return (
    <Box
      sx={ {
        border: 'solid 1px',
        borderRadius: '30px',
        maxWidth: '90vw',
        margin: '0 auto',
        padding: '20px',
      } }
    >
      <Search />
      <Filter />
      <Table />
    </Box>
  );
}

export default StarWarsPlanets;
