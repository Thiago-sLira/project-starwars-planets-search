import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Header from './components/Header';
import Search from './components/Search';
import Table from './components/Table';

function App() {
  return (
    <div>
      <Header />
      <Search />
      <Filter />
      <Table />
    </div>
  );
}

export default App;
