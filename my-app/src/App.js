import React, { useState, useEffect } from "react";
import Arena from "./components/Arena";

function App() {
  const [locations, setLocation] = useState({});
  const [areaLocation, setAreaLocation] = useState([]);
  const [startBattle, setStartBattle] = useState([false, -1]);
  const [pokemon, setPokemon] = useState({});
  const [load, setLoad] = useState(false)
  

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
    setStartBattle([true, e.target.id]);
  };
  
  return (
    <div className="App">
      {startBattle[0] === false &&
        locations.results?.map((location, index) => (
          <button onClick={showLocation} id={index} key={index}>
            {location.name}
          </button>
        ))}
      {startBattle[0] ===true && (
        <>
        <Arena
            location={areaLocation[startBattle[1]]}
          />
          <button onClick={()=>setStartBattle([false,-1])}>Back</button>
        </>
      )}
    </div>
  );
}

export default App;
