import React from "react";

import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.ts";
import { Pokemon } from "../../pages/Search";

import * as S from "./styles.ts";

interface IPokemonCardProps {
  pokemon: Pokemon;
  handleClick: (url: string) => void;
}

const PokemonCard: React.FC<IPokemonCardProps> = (props) => {
  const { pokemon, handleClick } = props;

  const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];

  return (
    <S.Container onClick={() => handleClick(pokemon.url)}>
      <div className="pokeball-icon"></div>
      <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt={pokemon.name}
      />
    </S.Container>
  );
};
export default PokemonCard;
