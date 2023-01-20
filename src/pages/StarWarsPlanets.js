import React from 'react';
import Filter from '../components/Filter';
import Header from '../components/Header';
import Search from '../components/Search';
import Table from '../components/Table';

function StarWarsPlanets() {
  return (
    <div>
      <Header />
      <Search />
      <Filter />
      <Table />
    </div>
  );
}

export default StarWarsPlanets;
