import React , {useState,useEffect} from 'react'

const StartBattle = ({ selectedPokemon ,randomPokemonName,dataRandomPokemon}) => {
    const [enemyHP, setEnemyHP] = useState(dataRandomPokemon.stats[0].base_stat)
    const [myPokemonHP, setMyPokemonHP] = useState(selectedPokemon[0].stats[0].base_stat)
    const [turn, setTurn] = useState(0)
    const [victory,setVictory] = useState(false)

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
            if (enemyHP <= 0) {
                alert("Your Pokemon has won !")
            }
    
            setTurn(1)
        } else {
            const damageMyPokemon = calculateDamageMyPokemon();
            const newMyPokemonHp = myPokemonHP - damageMyPokemon;
            setMyPokemonHP(newMyPokemonHp)
                       console.log(`Damage My Pokemon inflicted: ${damageMyPokemon}`);
                       console.log(`Defender's My Pokemon HP: ${newMyPokemonHp}`);

            if (myPokemonHP <= 0) {
                alert("Your Pokemon has been defeated !");
                
            }

            setTurn(0);
        }

    }
  return (
      <div>
          <div>
          <img src={selectedPokemon[0].sprites.other.home.front_default} alt="Attacker" />
              <h1>{ myPokemonHP } HP</h1>
              <button class="attack-btn" onClick={handleAttack}>Attack</button>
          </div>
          <div>
              <img src={randomPokemonName} alt="Defender"/>
              <h1>{enemyHP} HP </h1>
          </div>
    </div>
  );
}

export default StartBattle