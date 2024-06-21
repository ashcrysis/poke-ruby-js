import React, { useState, useEffect, ChangeEvent, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

import Render from "../components/PokemonData/index.tsx";
import PokemonList from "../components/PokemonList/index.tsx";
import { fetchAllPokemons } from "../services/search.ts";

import "../App.css";
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

// interface Favorite {
//   name: string;
//   image_url: string;
// }

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allPokemonData, setAllPokemonData] = useState<Pokemon[]>([]);
  const [pokemonData, setPokemonData] = useState<IPokemonData | null>(null);
  // const [favorites, setFavorites] = useState<Favorite[]>([]);
  const navigate = useNavigate();
  let authorizationHeader = localStorage.getItem("authorizationHeader");

  useEffect(() => {
    const fetchData = async () => {
      if (!authorizationHeader) {
        authorizationHeader = "";
      }

      const pokeData = await fetchAllPokemons(authorizationHeader);
      setAllPokemonData(pokeData);
    };

    fetchData();
  }, []);

  if (authorizationHeader == null || authorizationHeader === "") {
    alert("You are not allowed to access this page before logging in.");
    navigate("/");
    return <></>;
  }

  const filterPokemon = (query: string): Pokemon[] => {
    return allPokemonData.filter((pokemon) => {
      return (
        pokemon.name.startsWith(query.toLowerCase().trim()) ||
        pokemon.url.endsWith(`/${query}/`)
      );
    });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
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
      console.error("Error fetching Pokémon data:", error);
    }
  };

  // const clearFavorites = (): void => {
  //   setFavorites([]);
  // };

  return (
    <div>
      {/* <div className="favorites-container">
        <h2>Favorites List</h2>
        {favorites.map((favorite) => (
          <a
            key={favorite.name}
            href={`/v1/pokemon?pokemon_name=${favorite.name}&commit=Search`}
            className="favorite-link"
          >
            <div className="card">
              <h2>{capitalizeFirstLetter(favorite.name)}</h2>
              <img src={favorite.image_url} alt={favorite.name} />
            </div>
          </a>
        ))}
        <button onClick={clearFavorites} className="clear-favorites-button"> 
      
        Clear All Favorites
      </button>
      */}
      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          placeholder="Search Pokemon..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <PokemonList
        pokemonList={filterPokemon(searchQuery)}
        onClickCard={handlePokemonClick}
      />

      <Modal
        open={!!pokemonData}
        footer={null}
        onCancel={() => setPokemonData(null)}
        onClose={() => setPokemonData(null)}
      >
        {pokemonData && <Render pokemonData={pokemonData} />}
      </Modal>
    </div>
  );
};

export default Search;