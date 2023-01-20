import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import StarWarsPlanets from './pages/StarWarsPlanets';

function App() {
  return (
    <PlanetsProvider>
      <StarWarsPlanets />
    </PlanetsProvider>
  );
}

export default App;
