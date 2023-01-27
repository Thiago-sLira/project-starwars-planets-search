import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import StarWarsPlanets from './pages/StarWarsPlanets';

function App() {
  return (
    <PlanetsProvider>
      <div className="title-star">
        <div>
          <div>
            <p>STAR</p>
            <p>WARS</p>
          </div>
        </div>
      </div>
      <StarWarsPlanets />
    </PlanetsProvider>
  );
}

export default App;
