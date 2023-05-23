import React, { useState, useEffect } from "react";

export default function Arena({ location }) {
  const [sprites, setSprites] = useState(null);
  const [load, setLoad] = useState(false);
  let encounterPoke = [];

  let pokeArr = [];
  location.pokemon_encounters?.map((pokemons) => pokeArr.push(pokemons));

  useEffect(() => {
    pokeArr?.map((poke) => {
      fetch(`${poke.pokemon.url}`)
        .then((res) => res.json())
        .then((data) => {
          encounterPoke.push(data);
        });
    });
    setTimeout(() => {
      setSprites(encounterPoke);
      setLoad(true);
    }, 1000);
  }, []);

  return (
    <div>
      {load ? (
        pokeArr.length > 0 ? (
          pokeArr?.map((poke, index) => {
            return (
              <h3 key={index}>
                {poke.pokemon.name}
                {sprites?.map((sprite, index) => {
                  if (sprite.name === poke.pokemon.name) {
                    return (
                      <img key={index} src={sprite.sprites.front_default} />
                    );
                  }
                })}
              </h3>
            );
          })
        ) : (
          <div>
            <h2>This location doesn't seem to have any pokémon</h2>
            <button>Go back</button>
          </div>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
