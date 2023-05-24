import React, { useState, useEffect } from "react";
import Locations from "./Locations";

const SelectPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [load, setLoad] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  let pokeArr = [];

  useEffect(() => {
    for (let id = 1; id <= 5; id++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => {
          pokeArr.push(data);
        });
    }
    setTimeout(() => {
      setPokemon(pokeArr);
      setLoad(true);
    }, 2000);
  }, []);

  return (
    <div>
      {showLocations ? (
        <Locations />
      ) : (
        <div>
          <button
            onClick={() => {
              setShowLocations(true);
            }}
          >
            Show Locations
          </button>
          {load ? (
            pokemon?.map((poke, index) => (
              <div key={index}>
                <button>{poke.name}</button>
                <img src={poke.sprites.front_default} alt={poke.name} />
              </div>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectPokemon;
