import { atom } from 'jotai';

const state = {
    enemyPokemon: atom(null),
    encounterStart: atom(true),
    choosePokemon: atom(null),
}

export default state;