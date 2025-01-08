import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [allPokemon, fetchAllPokemon] = useState([]);
    useEffect(() => {
        try {
            async function fetchPokemon() = await
        } catch(e) {
            console.error(e);
        }
    }, []);

    return (
        <>
            <h1>Gotta catch em all!</h1>
            <article>
                <p>{name}</p>
                <span>
                <img src={image} alt={`image of ${name}`} />
            </span>
                <p>Moves: {moves}</p>
                <p>Weight: {weight}</p>
                <p>Abilities:</p>
                <ul>
                    {allPokemon[name]?.abilities.map((ability, index) => {
                        return (
                            <li key={index}>{ability}</li>
                        )
                    })}
                </ul>
            </article>
        </>
    )
}

export default App
