import React, { useState, useEffect } from "react";
import "../App.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/pokemons/fetch_all`
        );
        console.log(process.env);
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
  }, []);
  const filterPokemon = (query) => {
    return allPokemonData.filter((pokemon) => {
      return (
        pokemon.name.startsWith(query.toLowerCase().trim()) ||
        pokemon.url.endsWith(`/${query}/`)
      );
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const displayResults = (pokemonList) => {
    return pokemonList.map((pokemon) => {
      const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
      return (
        <a
          key={pokemon.name}
          href={`/v1/pokemon?pokemon_name=${pokemon.name.toLowerCase()}`}
          style={{ textDecoration: "none" }}
        >
          <div className="card">
            <div className="pokeball-icon"></div>
            <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
              alt={pokemon.name}
            />
          </div>
        </a>
      );
    });
  };

  const clearFavorites = () => {};

  return (
    <div>
      <h2>Favorites List</h2>
      <div className="favorites-container">
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
      </div>
      <button onClick={clearFavorites} className="clear-favorites-button">
        Clear All Favorites
      </button>
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
