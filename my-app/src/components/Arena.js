import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import state from "./State";

export default function Arena({ location }) {
  const [sprites, setSprites] = useState(null);
  const [load, setLoad] = useState(false);
  const [encounter, setEncounter] = useAtom(state.enemyPokemon);
    const [encounterStart, setEncounterStart] = useAtom(state.encounterStart);
    const [selPokemon, setSelPokemon] = useState(true);

  let encounterPoke = location.pokemon_encounters[Math.floor(Math.random() * location.pokemon_encounters.length)]

  useEffect(() => {
    fetch(`${encounterPoke.pokemon.url}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setEncounter(data)
      })
    setTimeout(() => {
      // setSprites(encounterPoke)
      setLoad(true)
    },1000)
  }, []);

  function rememberPokemon(e) {
    setEncounterStart(e);
    setSelPokemon(false);
  }

  return (
    <div>
      {load ? (
        <>
        <button onClick={(encounter)=>rememberPokemon(encounter)}>{encounter.name}</button>
        <img src={encounter.sprites.front_default}/>
        </>
      ) : (
          <h2>Loading...</h2>
      )
     }
    </div>

  );
}
