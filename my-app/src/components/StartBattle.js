import React , {useState,useEffect} from 'react'

const StartBattle = ({ selectedPokemon ,randomPokemonName,dataRandomPokemon}) => {
    const [enemyHP, setEnemyHP] = useState(dataRandomPokemon.stats[0].base_stat)
    const [myPokemonHP, setMyPokemonHP] = useState(selectedPokemon[0].stats[0].base_stat)
    const [turn, setTurn] = useState(0)
    console.log(selectedPokemon);

    const calculateDamageEnemy = () => {
        const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
        const damage = (((2 / 5 + 2) * selectedPokemon[0].stats[1].base_stat * 60) / dataRandomPokemon.stats[2].base_stat / 50 + 2) * Z / 255
        return Math.floor(damage)
    }
    const calculateDamageMyPokemon = () => {
        const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
        const damageMyPokemon = (((2 / 5 + 2) * dataRandomPokemon.stats[2].base_stat  * 60) / selectedPokemon[0].stats[1].base_stat / 50 + 2) * Z / 255
        return Math.floor(damageMyPokemon);

    }

    const handleAttack = () => {
        if (turn === 0) {      
            const damage = calculateDamageEnemy()
            const newEnemyHP = enemyHP - damage;
            setEnemyHP(newEnemyHP)
            console.log(`Damage enemy inflicted: ${damage}`);
            console.log(`Defender's enemy HP: ${newEnemyHP}`)
    
            setTurn(1)
        } else {
            const damageMyPokemon = calculateDamageMyPokemon();
            const newMyPokemonHp = myPokemonHP - damageMyPokemon;
            setMyPokemonHP(newMyPokemonHp)
                       console.log(`Damage My Pokemon inflicted: ${damageMyPokemon}`);
                       console.log(`Defender's My Pokemon HP: ${newMyPokemonHp}`);

            setTurn(0);

        }
    }
  return (
    <div id="finalBatt">
      <button id="attack" onClick={handleAttack}>
        
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="css-i6dzq1"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>{" "}
        Attack!
      </button>
      {/* <button id="attack" onClick={handleAttack}>
        Attack
      </button> */}
      <div id="myPoke">
        <h1 id="hp"> {myPokemonHP}</h1>
        <img
          id="img"
          src={selectedPokemon[0].sprites.other.home.front_default}
          alt="Attacker"
        />
      </div>
      <div id="enemyPoke">
        <h1 id="hp">{enemyHP}</h1>
        <img id="img" src={randomPokemonName} alt="Defender" />
      </div>
    </div>
  );
}

export default StartBattle