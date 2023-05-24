import React, { useState, useEffect } from "react";

const Area = ({ i }) => {
  const [area, setArea] = useState({});
    // let randomPokemon = Math.floor(Math.random() * area.pokemon_encounters.length)
    
  async function fetcher(url) {
    const req = await fetch(url);
    return await req.json();
  }

  useEffect(() => {
    async function getStuff() {
      const data = await fetcher(
        `https://pokeapi.co/api/v2/location-area/${i}`
      );
      setArea(data.pokemon_encounters);
      console.log(area);
    }
      getStuff();
  }, []);

  return <div></div>;
};
export default Area;
