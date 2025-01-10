import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";

function App() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previousPokemon, setPreviousPokemon] = useState("");
    const [nextPokemon, setNextPokemon] = useState("");
    const [error, toggleError] = useState(false);
    const controller = new AbortController();

    async function fetchPokemon() {
        setLoading(true);
        toggleError(false);
        try {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
            setAllPokemon(response.data.results);
            setPreviousPokemon(response.data.previous);
            setNextPokemon(response.data.next);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
            toggleError(true);
        }
    }

    async function fetchPreviousPokemon() {
        setLoading(true);
        toggleError(false);
        try {
            const response = await axios.get(previousPokemon, {
                signal: controller.signal,
            });
            setAllPokemon(response.data.results);
            setPreviousPokemon(response.data.previous);
            setNextPokemon(response.data.next);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
            toggleError(true);
        }
    }

    async function fetchNextPokemon() {
        setLoading(true);
        toggleError(false);
        try {
            const response = await axios.get(nextPokemon);
            setAllPokemon(response.data.results);
            setPreviousPokemon(response.data.previous);
            setNextPokemon(response.data.next);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
            toggleError(true);
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        fetchPokemon();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    console.log(allPokemon);
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <h1 className="title">Gotta catch em all!</h1>
            <div className="button-wrapper">
                <button className={`pageButton ${previousPokemon===null && "void"}`} type="button" disabled={previousPokemon === null} onClick={fetchPreviousPokemon}>Vorige</button>
                <button className={`pageButton ${nextPokemon===null && "void"}`} type="button" disabled={nextPokemon === null} onClick={fetchNextPokemon}>Volgende</button>
            </div>
            <div className="pokemonCard-container">
                {error && <h2 className="errorMessage">Er ging iets mis bij het ophalen van de data... Probeer het nog eens.</h2>}
                {allPokemon.map((pokemon) => {
                    return (
                        <PokemonCard
                            key={pokemon.name}
                            url={pokemon.url}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App
