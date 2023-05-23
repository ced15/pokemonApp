import React, { useState } from "react";

const LocationTasks = ({ location, areaLocation, showArena , setImgPokemon}) => {
  const [locationClicked, setLocationClicked] = useState(false);
  const [encounteredPokemon, setEncounteredPokemon] = useState({});

  function handleArenaClick(i) {
    if (areaLocation[i].pokemon_encounters.length === 0) {
      setEncounteredPokemon(null);
      setLocationClicked(true);
    } else {
      setEncounteredPokemon(areaLocation[i].pokemon_encounters[0].pokemon);
        setLocationClicked(true);
    }
      
  }

  return (
    <div>
      {locationClicked ? (
        encounteredPokemon ? (
          <div>
            <h3>{encounteredPokemon.name}</h3>
            <img
              src={setImgPokemon}
              alt={encounteredPokemon.name}
            />
            <button onClick={() => setLocationClicked(false)}>Go Back</button>
          </div>
        ) : (
          <div>
            <p>This location doesn't seem to have any Pokémon.</p>
            <button onClick={() => setLocationClicked(false)}>Go Back</button>
          </div>
        )
      ) : (
        location?.results?.map((location, index) => (
          <button onClick={() => handleArenaClick(index)} key={index}>
            {location.name}
          </button>
        ))
      )}
    </div>
  );
};

export default LocationTasks;
