import React, { useState, useEffect } from "react";
import state from "./State";
import { useAtom } from "jotai";

const SelectPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [load, setLoad] = useState(false);
    const [encounterStart, setEncounterStart] = useAtom(state.encounterStart);
  const [choosePokemon, setChoosePokemon] = useAtom(state.choosePokemon);
    
  const [selPokemon, setSelPokemon] = useState(true);
  // const [choosePokemon,setChoosePokemon] = useAtom(state.choosePokemon)

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
  //   console.log(pokemon);

    function rememberPokemon(e) {
        setChoosePokemon(e);
        setEncounterStart(false)
        // setSelPokemon(false); 
  }

  return (
    <div>
      {encounterStart && load
        ? pokemon?.map((poke, index) => {
            return (
              <div key={index}>
                <button onClick={(poke) => rememberPokemon(poke)}>
                  {poke.name}
                </button>
                <img src={poke.sprites.front_default}></img>
              </div>
            );
          })
        : encounterStart && <h2>Loading...</h2>}
    </div>
  );
};

export default SelectPokemon;
