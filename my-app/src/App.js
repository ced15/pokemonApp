import React, { useState, useEffect } from "react";
import SelectPokemon from "./components/SelectPokemon";
import Locations from "./components/Locations";

function App() {
  
  const [loadStart, setLoadStart] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const handleStartClick = () => {
    setLoadStart(true)
  } 
  
  const handleSelectPokemonClick = () => {
    setShowLocations(true);
  } 

  return (
    <div className="App">
      {!loadStart && (
        <button onClick={handleStartClick} id="button">
          Start and choose your Pokemon!
        </button>
      )}
      {loadStart && !showLocations && (
        <SelectPokemon onSelectPokemon={handleSelectPokemonClick} />
      )}
      {showLocations && <Locations />}
    </div>
  );
}

export default App;
