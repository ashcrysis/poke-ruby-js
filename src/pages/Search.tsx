import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Modal } from "antd";

import Header from "../components/Header/index.tsx";
import Render from "../components/PokemonData/index.tsx";
import PokemonList from "../components/PokemonList/index.tsx";
import { fetchAllPokemons } from "../services/search.ts";
import "../App.css";
import * as S from "../styles/search.styles.ts";
import SearchBar from "../components/SearchBar/index.tsx";
import { message } from "antd";
export interface Pokemon {
  name: string;
  url: string;
}

export interface IPokemonData {
  name: string;
  types: string[];
  image: string;
  height: number;
  weight: number;
  moves: string;
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allPokemonData, setAllPokemonData] = useState<Pokemon[]>([]);
  const [pokemonData, setPokemonData] = useState<IPokemonData | null>(null);
  const navigate = useNavigate();
  let authorizationHeader = localStorage.getItem("authorizationHeader");

  const checkTokenExpiry = () => {
    if (!authorizationHeader) return;

    try {
      const decodedToken: any = jwtDecode(authorizationHeader);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("authorizationHeader");
        alert("Your session has expired. Please log in again.");
        navigate("/");
      }
    } catch (error) {
      message.error("Error decoding token:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!authorizationHeader) {
        authorizationHeader = "";
      }

      const pokeData = await fetchAllPokemons(authorizationHeader);
      setAllPokemonData(pokeData);
    };

    fetchData();

    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, [authorizationHeader]);

  if (!authorizationHeader) {
    alert("You are not allowed to access this page before logging in.");
    navigate("/");
    return <></>;
  }

  const filterPokemon = (query: string): Pokemon[] => {
    if (!allPokemonData || allPokemonData.length === 0) {
      return [];
    }

    return allPokemonData.filter((pokemon) => {
      return (
        pokemon.name.startsWith(query.toLowerCase().trim()) ||
        pokemon.url.endsWith(`/${query}/`)
      );
    });
  };

  const handleSearch = (value: string): void => {
    setSearchQuery(value);
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlePokemonClick = async (pokemonUrl: string): Promise<void> => {
    try {
      const response = await fetch(pokemonUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data");
      }
      const data = await response.json();
      setPokemonData({
        name: data.name,
        types: data.types.map((typeInfo: any) => typeInfo.type.name),
        image: data.sprites.front_default,
        height: data.height / 10,
        weight: data.weight / 10,
        moves: data.moves
          .slice(0, 2)
          .map((move: any) => capitalizeFirstLetter(move.move.name))
          .join(", "),
      });
    } catch (error) {
      message.error("Error fetching Pokémon data:", error);
    }
  };
  return (
    <S.Container>
      <Header />

      <SearchBar onFilter={handleSearch} />

      <PokemonList
        pokemonList={[...filterPokemon(searchQuery)]}
        onClickCard={handlePokemonClick}
      />
      <Modal
        title={pokemonData ? capitalizeFirstLetter(pokemonData.name) : ""}
        open={!!pokemonData}
        footer={null}
        onCancel={() => setPokemonData(null)}
        onClose={() => setPokemonData(null)}
      >
        {pokemonData && <Render pokemonData={pokemonData} />}
      </Modal>
    </S.Container>
  );
};

export default Search;
