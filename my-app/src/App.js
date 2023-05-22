import './App.css';
import React, { useState, useEffect } from "react";


function App() {
    const [pokemon, setPokemon] = useState(null);
    const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setPokemon(data);
      });
  }, []);

  return (
    <div className="App">
  
    </div>
  );
}

export default App;
