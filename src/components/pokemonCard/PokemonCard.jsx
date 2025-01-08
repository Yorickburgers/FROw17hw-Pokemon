import React from 'react';
import "./PokemonCard.css"

export function PokemonCard({name, image, moves, weight, abilities}) {
    return (
        <>
            <article>
                <p>{name}</p>
                <span>
                <img src={image} alt={`image of ${name}`}/>
            </span>
                <p>Moves: {moves}</p>
                <p>Weight: {weight}</p>
                <p>Abilities:</p>
                <ul>
                    {abilities.map((ability, index) => {
                        return (
                            <li key={index}>{ability}</li>
                        );
                    })}
                </ul>
            </article>
        </>
    );
}

export default PokemonCard;