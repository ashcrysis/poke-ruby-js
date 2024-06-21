import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonData {
  name: string;
  types: string[];
  image: string;
  height: number;
  weight: number;
  moves: string;
}

interface Favorite {
  name: string;
  image_url: string;
}

interface SearchProps {
  setPokemonData: (data: PokemonData) => void;
}

const Search: React.FC<SearchProps> = ({ setPokemonData }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allPokemonData, setAllPokemonData] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const navigate = useNavigate();
  const authorizationHeader = localStorage.getItem("authorizationHeader");
  if (authorizationHeader == null || authorizationHeader === "") {
    alert("You are not allowed to access this page before logging in.");
    navigate("/");
  }
  useEffect(() => {
    const fetchAllPokemon = async () => {
      if (authorizationHeader == null || authorizationHeader === "") {
        alert("You are not allowed to access this page before logging in.");
        navigate("/");
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/v2/pokemons/fetch_all`,
          {
            headers: {
              Authorization: `Bearer ${authorizationHeader}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data = await response.json();
        setAllPokemonData(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllPokemon();
  }, [authorizationHeader]);

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

  const displayResults = (pokemonList: Pokemon[]) => {
    return pokemonList.map((pokemon) => {
      const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
      return (
        <div
          key={pokemonId}
          className="card"
          onClick={() => handlePokemonClick(pokemon.url)}
        >
          <div className="pokeball-icon"></div>
          <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={pokemon.name}
          />
        </div>
      );
    });
  };

  const clearFavorites = (): void => {
    setFavorites([]);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          placeholder="Search Pokemon..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div id="resultsContainer" className="results-container">
        {displayResults(filterPokemon(searchQuery))}
      </div>
    </div>
  );
};

export default Search;
