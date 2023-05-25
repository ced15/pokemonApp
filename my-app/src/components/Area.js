import React, { useState, useEffect } from "react";
import Locations from "./Locations";

const Area = ({ i }) => {
  const [area, setArea] = useState({});
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [randomPokemonImage, setRandomPokemonImage] = useState(null);
  const [goBack, setGoBack] = useState(false);

  async function fetcher(url) {
    const req = await fetch(url);
    return await req.json();
  }

  useEffect(() => {
    async function getStuff() {
      const data = await fetcher(
        `https://pokeapi.co/api/v2/location-area/${i}`
      );
      setArea(data);
      console.log(data);
    }
    getStuff();
  }, [i]);

  useEffect(() => {
    if (area.pokemon_encounters && area.pokemon_encounters.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * area.pokemon_encounters.length
      );
      const randomPokemonName =
        area.pokemon_encounters[randomIndex].pokemon.name;
      setRandomPokemon(randomPokemonName);

      fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonName}`)
        .then((res) => res.json())
        .then((data) => {
          setRandomPokemonImage(data.sprites.other.home.front_default);
        })
        .catch((error) => {
          console.log(error);
          setRandomPokemonImage(null);
        });
    }
  }, [area]);

  return (
    <div>
      {goBack ? (
        <Locations />
      ) : randomPokemon ? (
        <div>
          <div id="battle"></div>
          <h3>{randomPokemon}</h3>
          {randomPokemonImage ? (
            <img
              id="pokemonEnemy"
              src={randomPokemonImage}
              alt={randomPokemon}
            />
          ) : (
            <div className="loader">
              <span className="loader-text">loading</span>
              <span className="load"></span>
            </div>
          )}
          <button
            id="location"
            className="battleButt"
            onClick={() => setGoBack(true)}
          >
            Go Back
          </button>
          <button id="location" className="battleButt">
            Start Battle!
          </button>
        </div>
      ) : (
        <div className="loader">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      )}
    </div>
  );
};

export default Area;
