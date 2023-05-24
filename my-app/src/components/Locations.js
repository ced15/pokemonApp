import React, { useState, useEffect } from "react";
import Area from "./Area";
import SelectPokemon from "./SelectPokemon";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [showArea, setShowArea] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
  const [goBack, setGoBack] = useState(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.results);
      });
  }, []);

  const handleLocationClick = (index) => {
    setSelectedLocationIndex(index);
    setShowArea(true);
  };

  return (
    <div>
      {goBack ? (
        <SelectPokemon />
      ) : showArea ? (
        <Area i={selectedLocationIndex + 1} />
      ) : (
        <div>
          <h2>List of Locations:</h2>
          <ul>
            {locations.map((location, index) => (
              <li key={index}>
                <button onClick={() => handleLocationClick(index)}>
                  {location.name}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setGoBack(true)}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default Locations;
