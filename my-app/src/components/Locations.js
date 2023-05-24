import React, { useState, useEffect } from "react";
import Area from "./Area";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [showArea, setShowArea] = useState([false,-1]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setLocations(data.results);
      });
  }, []);

  return (
    <div>
      {showArea[0] ? (
        <Area i={showArea[1]} />
      ) : (
        <div>
          <h2>List of Locations:</h2>
          <ul>
            {locations.map((location, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setShowArea([true,index+1]);
                  }}
                >
                  {location.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Locations;
