import React, { useState, useEffect } from "react";
import Locations from "./Locations";

const SelectPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [load, setLoad] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [inventory,setInventory] = useState([])

  let pokeArr = [];

  useEffect(() => {
    for (let id = 1; id <= 2; id++) {
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

  const handlePokemonSelect= (pokemon) => {
    const isSelectedPokemon = inventory.includes(pokemon)
    if (!isSelectedPokemon) {
      setInventory((prevInventory) => [...prevInventory, pokemon])
    }
  }

  const handlePokemonDeselect= (pokemon) => {
    setInventory((prevInventory)=>prevInventory.filter((p)=>p !== pokemon))
  }
  
  useEffect(() => {
    console.log(inventory)
  },[inventory])

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
                <button onClick={() => handlePokemonSelect(poke)}>Select: {poke.name}</button>
                <button onClick={() => handlePokemonDeselect(poke)}>Deselect: {poke.name}</button>
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
}



export default SelectPokemon;
