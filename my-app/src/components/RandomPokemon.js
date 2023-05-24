// export default function Locations({ location }) {
//   const [location, setLocation] = useState([]);

//   let encounterPoke =
//     location.pokemon_encounters[
//       Math.floor(Math.random() * location.pokemon_encounters.length)
//     ];

//   useEffect(() => {
//     fetch(`${encounterPoke.pokemon.url}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setEncounter(data);
//       });
//     setTimeout(() => {
//       setLoad(true);
//     }, 1000);
//   }, []);

//   return (
//     <div>
//       {load ? (
//         <>
//           <button>{encounter.name}</button>
//           <img src={encounter.sprites.front_default} />
//         </>
//       ) : (
//         <h2>Loading...</h2>
//       )}
//     </div>
//   );
// }
