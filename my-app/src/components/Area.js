import React, { useState, useEffect } from "react";
import Locations from "./Locations";
import StartBattle from "./StartBattle";

const Area = ({ i, selectedPokemon }) => {
  const [area, setArea] = useState({});
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [randomPokemonImage, setRandomPokemonImage] = useState(null);
  const [goBack, setGoBack] = useState(false);
  const [showBattle, setShowBattle] = useState(false)
  const [dataRandomPokemon, setDataRandomPokemon] = useState([])

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
    if (area.pokemon_encounters && area.pokemon_encounters.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * area.pokemon_encounters.length
      );
      const randomPokemonName =
        area.pokemon_encounters[randomIndex].pokemon.name;
      setRandomPokemon(randomPokemonName);

      fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonName}`)
        .then((res) => res.json())
        .then((data) => {
          setRandomPokemonImage(data.sprites.other.home.front_default);
          setDataRandomPokemon(data);
        })
        .catch((error) => {
          console.log(error);
          setRandomPokemonImage(null);
        });
    }
  }, [area]);

  return (
    <div>{
      showBattle ? (<StartBattle selectedPokemon={selectedPokemon}
        randomPokemonName={randomPokemonImage}
        dataRandomPokemon={dataRandomPokemon } />
        ) : goBack ? (
        <Locations selectedPokemon={selectedPokemon}/>
      ) : randomPokemon ? (
        <div id="battle">
          <div id="enemy">
            {randomPokemonImage ? (
              <img
                id="pokemonEnemy"
                src={randomPokemonImage}
                alt={randomPokemon}
              />
            ) : (
              <div className="loader">
                <span className="loader-text">loading</span>
                <span className="load"></span>
              </div>
            )}
            {/* <h3>{randomPokemon}</h3> */}
            </div>
            <div id="battleBtn">
          <button
            id="back"
            className="battleButt"
            onClick={() => setGoBack(true)}
          >
            <svg
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1024"
            >
              <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
            </svg>
            <span>Back</span>
          </button>
            <button onClick={()=>setShowBattle(true)} id="location" className="battleButt">
            Start Battle!
            </button>
            </div>
        </div>
      ) : (
        <div className="loader">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      )}
    </div>
  );
};

export default Area;
