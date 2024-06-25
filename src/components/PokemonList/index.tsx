import React, { useState, useEffect } from "react";
import { Pokemon } from "../../pages/Search.tsx";
import PokemonCard from "../PokemonCard/index.tsx";
import { Skeleton } from "antd";
import * as S from "./styles.ts";

interface IPokemonListProps {
  pokemonList: Pokemon[];
  onClickCard: (url: string) => void;
}

const PokemonList: React.FC<IPokemonListProps> = (props) => {
  const { pokemonList, onClickCard } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <S.Container>
      {loading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} active />
          ))}
        </>
      ) : (
        pokemonList.map((pokemon, index) => (
          <PokemonCard
            key={`${pokemon.name}-${index}`}
            pokemon={pokemon}
            handleClick={onClickCard}
          />
        ))
      )}
    </S.Container>
  );
};

export default PokemonList;
