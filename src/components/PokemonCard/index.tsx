import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import axios from "axios";

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
  const [sprite, setSprite] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.REACT_APP_POKEAPI_API_URL
          }/pokemon/${pokemon.name.toLowerCase()}`
        );
        setSprite(response.data.sprites.front_default);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the Pokémon data", error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemon.name]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  return (
    <S.Container
      onClick={() =>
        handleClick(
          `${
            process.env.REACT_APP_POKEAPI_API_URL
          }/pokemon/${pokemon.name.toLowerCase()}`
        )
      }
    >
      <div className="pokeball-icon"></div>
      {loading ? (
        <Skeleton active title paragraph={{ rows: 0 }} />
      ) : (
        <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
      )}
      {loading && <Skeleton.Image />}
      {sprite && (
        <img
          src={sprite}
          alt={pokemon.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </S.Container>
  );
};

export default PokemonCard;
