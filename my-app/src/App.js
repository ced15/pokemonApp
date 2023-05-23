import React, { useState, useEffect } from "react";
import { Arena } from "./components/Arena";
import LocationTasks from "./components/LocationTask";

function App() {
  const [location, setLocation] = useState({});
  const [areaLocation, setAreaLocation] = useState([]);
  const [startBattle, setStartBattle] = useState([false, -1]);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setLocation(data);
      });
  }, []);

  async function fetcher(url) {
    const req = await fetch(url);
    return await req.json();
  }

  useEffect(() => {
    async function getStuff() {
      // console.clear();
      for (let i = 1; i <= 20; i++) {
        const data = await fetcher(
          `https://pokeapi.co/api/v2/location-area/${i}`
        );
        console.log(data);
        setAreaLocation((oldAreaLocation) => [...oldAreaLocation, data]);
      }
    }
    getStuff();
  }, []);

  useEffect(() => {
    async function getPokemon() {
      for (let i = 1; i <= 100; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then((res) => res.json())
          .then((dataPokemon) => {
            setPokemon(dataPokemon.sprites.back_default)
            // console.log(dataPokemon)
        })
      }
    }
    getPokemon();
    console.log(pokemon);

  }, []);

  function showArena(i) {
    setStartBattle([true, i]);
  }

  return (
    <div className="App">
      {startBattle[0] ? (
        <Arena pokemons={areaLocation[startBattle[1]].pokemon_encounters} />
      ) : (
        <LocationTasks
          location={location}
          areaLocation={areaLocation}
          showArena={showArena}
          setImgPokemon={pokemon}
        />
      )}
    </div>
  );
}

export default App;
