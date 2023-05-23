import React, { useState, useEffect } from "react";

export default function Arena({ location }) {
    const [sprites, setSprites] = useState(null);
    const [load,setLoad] =useState(false)
  let encounterPoke = [];

  let pokeArr = [];
  location.pokemon_encounters?.map((pokemons) => pokeArr.push(pokemons));

  useEffect(() => {
    pokeArr?.map((poke) => {
      // console.log(poke)
      fetch(`${poke.pokemon.url}`)
        .then((res) => res.json())
        .then((data) => {
        //   console.log(sprites);
          encounterPoke.push(data);
        });
    });
    setTimeout(() => {
        setSprites(encounterPoke)
        setLoad(true)
    }, 1000);
  }, []);

  return (
    <div>
   {load ? (   pokeArr?.map((poke, index) => {
        return (
          <h3 key={index}>
            {poke.pokemon.name}
            {sprites?.map((sprite,index) => {
              if (sprite.name === poke.pokemon.name) {
                  return <img key={ index } src={sprite.sprites.front_default} />;
              }
            })}
          </h3>
        );
   })) : (
          <h2>Loading...</h2>
      )} 
    </div>
  );
}
