import React, { useState, useEffect } from "react";
import Area from "./Area";
import SelectPokemon from "./SelectPokemon";

const Locations = ({selectedPokemon}) => {
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
    <div className="list">
      {goBack ? (
        <SelectPokemon />
      ) : showArea ? (
          <Area i={selectedLocationIndex + 1}
                selectedPokemon={selectedPokemon}  />
      ) : (
        <div>
          <button className="loc" type="button">
            <strong>Locations</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>
            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>

          <div className="map-container">
            {locations.map((location, index) => (
              <button
                className="map-pin"
                key={index}
                onClick={() => handleLocationClick(index)}
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                }}
              >
                {location.name}
              </button>
            ))}
          </div>

          <button id="back" onClick={() => setGoBack(true)}>
            <svg
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1024"
            >
              <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
            </svg>
            <span>Back</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Locations;
