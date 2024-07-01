import React, { useState, useEffect, useRef } from "react";
import { Pokemon } from "../../pages/Search.tsx";
import PokemonCard from "../PokemonCard/index.tsx";
import { Skeleton, Empty, Pagination } from "antd";
import * as S from "./styles.ts";
import "../../App.css";

interface IPokemonListProps {
  pokemonList: Pokemon[];
  onClickCard: (url: string) => void;
}

const PokemonList: React.FC<IPokemonListProps> = (props) => {
  const { pokemonList, onClickCard } = props;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(32);
  const previousPokemonListLength = useRef(pokemonList.length);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (pokemonList.length !== previousPokemonListLength.current) {
      setCurrentPage(1);
    }
    previousPokemonListLength.current = pokemonList.length;
  }, [pokemonList]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastPokemon = currentPage * pageSize;
  const indexOfFirstPokemon = indexOfLastPokemon - pageSize;
  const currentPokemons = pokemonList.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  return (
    <S.Container>
      {loading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} active />
          ))}
        </>
      ) : pokemonList.length === 0 ? (
        <S.noDataContainer>
          <Empty description="No Pokémon found" className="noData" />
        </S.noDataContainer>
      ) : (
        <>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={pokemonList.length}
            onChange={handlePageChange}
            style={{
              textAlign: "left",
              marginTop: "-15px",
              marginRight: "70vw",
              width: "100vw",
            }}
            showSizeChanger={false}
          />
          {currentPokemons.map((pokemon, index) => (
            <PokemonCard
              key={`${pokemon.name}-${index}`}
              pokemon={pokemon}
              handleClick={onClickCard}
            />
          ))}
        </>
      )}
    </S.Container>
  );
};

export default PokemonList;
