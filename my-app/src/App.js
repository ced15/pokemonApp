import './App.css';
import React, { useState, useEffect } from "react";


function App() {
    const [pokemon, setPokemon] = useState(null);
    const [location, setLocation] = useState(null);
    const [data, setData] = useState(null);
  
  
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => { 
        setLocation(data);
        setPokemon(data);
      });
  }, []);

  
    useEffect(() => {
      fetch("https://pokeapi.co/api/v2/generation/4/")
        .then((res) => res.json())
        .then((data) => { console.log(data);
          setData(data);
          setPokemon(data);
        });
    }, []);

useEffect(() => {
  for (let id = 1; id <= 100; id++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setPokemon(data);
      });
  }
}, []);
  

return <div className="App"></div>;
}

export default App;
