import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";

function App() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemon() {
            setLoading(true);
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
                console.log(response);
                setAllPokemon(response.data.results);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }
            fetchPokemon();
        }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Gotta catch em all!</h1>
            {allPokemon.map((pokemon) => {
                return (
            <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other["official-artwork"].front_default}
                moves={pokemon.moves.length}
                weight={pokemon.weight}
                abilities={pokemon.abilities}
            />
                );
            })}
        </>
    );
}

export default App
