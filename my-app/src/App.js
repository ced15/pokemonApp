import React, { useState, useEffect } from "react";
import Arena from "./components/Arena";
import SelectPokemon from "./components/SelectPokemon";
import { useAtom } from "jotai";
import state from "./components/State";

function App() {

  // const [locationStart, setLocationStart] = useState([false,-1])
  const [start, setStart] = useState([false, -1]);
  const [locations, setLocation] = useState({});
  const [areaLocation, setAreaLocation] = useState([]);
  const [encounterStart, setEncounterStart] = useAtom(state.encounterStart);


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
      for (let i = 1; i <= 20; i++) {
        const data = await fetcher(
          `https://pokeapi.co/api/v2/location-area/${i}`
        );

        setAreaLocation((oldAreaLocation) => [...oldAreaLocation, data]);
      }
    }
    getStuff();
  }, []);

  const showLocation = (e) => {
    setStart([true, e.target.id]);
    // setEncounterStart(true)
    console.log(start)
  };

  const showStartBattle = (e) => {
    setStart([start[0] - 1, e.target.id])
  }



  return (
    <div className="App">
      {start[0] === false && <button onClick={showLocation}>Start Battle</button>}
      {start[0] === true  && <SelectPokemon location={areaLocation[start[1]]} />}
      {(encounterStart === true || start[0] === false) &&
        locations.results?.map((location, index) => (
          <button onClick={showLocation} id={index} key={index}>
            {location.name}
          </button>
        ))}
      {/* {start[0] === 3 && (
        <>
          <Arena location={areaLocation[start[1]]} />
          <button onClick={showStartBattle}>Go Back</button>
        </>
      )} */}
    </div>
  );
}

export default App;
