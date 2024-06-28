import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";

import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.ts";
import { Pokemon } from "../../pages/Search";

import * as S from "./styles.ts";

interface IPokemonCardProps {
  pokemon: Pokemon;
  handleClick: (url: string) => void;
}

const PokemonCard: React.FC<IPokemonCardProps> = (props) => {
  const { pokemon, handleClick } = props;
  const [loading, setLoading] = useState(true);

  const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pokemon.url]);
  return (
    <S.Container onClick={() => handleClick(pokemon.url)}>
      <div className="pokeball-icon"></div>
      {loading ? (
        <Skeleton active title paragraph={{ rows: 0 }} />
      ) : (
        <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
      )}
      {loading && <Skeleton.Image />}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt={pokemon.name}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </S.Container>
  );
};

export default PokemonCard;
