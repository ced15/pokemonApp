import React, { useState, useEffect } from "react";

const Area = ({ i }) => {
  const [area, setArea] = useState({});
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [randomPokemonImage,setRandomPokemonImage] = useState(null)

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
      if (area.pokemon_encounters) {
        const randomIndex = Math.floor(
          Math.random() * area.pokemon_encounters.length
        );
        const randomPokemonName =
          area.pokemon_encounters[randomIndex].pokemon.name;
        setRandomPokemon(randomPokemonName);

        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonName}`)
          .then((res) => res.json())
          .then((data) => {
            setRandomPokemonImage(data.sprites.front_default);
          })
          .catch((error) => {
            console.log(error);
            setRandomPokemonImage(null);
          });
      }
    }, [area]);

  return (
    <div>
      {randomPokemon ? (
        <div>
          <h3>{randomPokemon}</h3>
          {randomPokemonImage ? (
            <img src={randomPokemonImage} alt={randomPokemon} />
          ) : (
            <p>No image available</p>
          )}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};


export default Area;
