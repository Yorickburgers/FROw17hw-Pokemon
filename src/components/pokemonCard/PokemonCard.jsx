import {useEffect, useState} from 'react';
import "./PokemonCard.css"
import axios from "axios";

export function PokemonCard({url}) {
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [error2, toggleError2] = useState(false);

useEffect(() => {
    const controller = new AbortController();

    async function fetchPokemonDetails(){
        toggleError2(false);
        try {
            const response = await axios.get(url, {
                signal: controller.signal,
            });
            setPokemonDetails(response.data);
            toggleError2(false);
        } catch (e) {
            console.error(e);
            toggleError2(true);
        }
    }

    fetchPokemonDetails();

    return function cleanup() {
        controller.abort();
    }

}, [url])

    if (Object.keys(pokemonDetails) < 1) {
        return <div>Loading...</div>;
    }

    const capitalizedName = pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.slice(1);

    return (
        <>
            {error2 && <h2 className="errorMessage">Er is iets misgegaan bij het ophalen van de details... Probeer het opnieuw</h2>}
            <article className="pokemonCard">
                <h2>{capitalizedName}</h2>
                <span className="sprite-wrapper">
                    <img src={pokemonDetails.sprites.other["official-artwork"].front_default} alt={`image of ${pokemonDetails.name}`}/>
                </span>
                <div className="inner-container">
                    <p>Moves: {pokemonDetails.moves.length}</p>
                    <p>Weight: {pokemonDetails.weight}</p>
                </div>
                <div className="inner-container">
                    <h3>Abilities:</h3>
                    <ul>
                    {pokemonDetails.abilities.map((ability, index) => {
                        return (
                            <li key={index}>{ability.ability.name}</li>
                        );
                    })}
                </ul>
                </div>
            </article>
        </>
    );
}

export default PokemonCard;