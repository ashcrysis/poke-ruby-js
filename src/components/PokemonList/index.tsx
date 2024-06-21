import React from "react";

import { Pokemon } from "../../pages/Search.tsx";
import PokemonCard from "../PokemonCard/index.tsx";

import * as S from "./styles.ts";

interface IPokemonListProps {
  pokemonList: Pokemon[];
  onClickCard: (url: string) => void;
}

const PokemonList: React.FC<IPokemonListProps> = (props) => {
  const { pokemonList, onClickCard } = props;
  return (
    <S.Container>
      {pokemonList.map((pokemon, index) => {
        return (
          <PokemonCard
            key={`${pokemon.name}-${index}`}
            pokemon={pokemon}
            handleClick={onClickCard}
          />
        );
      })}
    </S.Container>
  );
};

export default PokemonList;
