import React, { useState, useEffect } from "react";
import Locations from "./Locations";

const SelectPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [load, setLoad] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [inventory, setInventory] = useState([]);

  let pokeArr = [];

  useEffect(() => {
    for (let id = 1; id <= 90; id++) {
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

  const handlePokemonSelect = (pokemon) => {
    const isSelectedPokemon = inventory.includes(pokemon);
    if (!isSelectedPokemon) {
      setInventory((prevInventory) => [...prevInventory, pokemon]);
    }
  };

  const handlePokemonDeselect = (pokemon) => {
    setInventory((prevInventory) => prevInventory.filter((p) => p !== pokemon));
  };

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  return (
    <div id="start">
      {showLocations ? (
        <Locations />
      ) : (
        <div className="holder">
          <button
            id="location"
            className="arenaLocation"
            onClick={() => {
              setShowLocations(true);
            }}
          >
            Show Locations
          </button>
          {load ? (
            pokemon?.map((poke, index) => (
              <div className="pokeDiv" key={index}>
                <img
                  id="pokemon"
                  src={poke.sprites.other.home.front_default}
                  alt={poke.name}
                />
                <button
                  className="cta"
                  onClick={() => handlePokemonSelect(poke)}
                >
                  Select: {poke.name}
                </button>
                <button
                  className="cta"
                  onClick={() => handlePokemonDeselect(poke)}
                >
                  Deselect: {poke.name}
                </button>
              </div>
            ))
          ) : (
            <div className="loader">
              <span className="loader-text">loading</span>
              <span className="load"></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectPokemon;
