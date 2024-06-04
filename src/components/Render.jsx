import React, { useState, useEffect } from "react";
import "../App.css";
import defaultBg from "../poke-bgs/normal.png";
const Render = ({ name, types, image, height, weight, moves }) => {
  const [description, setDescription] = useState("Loading...");
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    const fetchPokemonSpeciesData = async (pokemonName) => {
      const authorizationHeader = localStorage.getItem("authorizationHeader");
      if (!authorizationHeader) {
        console.error("Authorization token not found");
        return;
      }
      console.log(pokemonName);
      const apiUrl = `${process.env.REACT_APP_API_URL}/v2/pokemons/species?name=${pokemonName}`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authorizationHeader}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPokemonSpeciesData(name);

    import(`../poke-bgs/${types[0]}.png`)
      .then((image) => setBgImage(image.default))
      .catch((error) => {
        console.error("Error importing image:", error);
        setBgImage(defaultBg);
      });
  }, [name, types]);
  const displayTypes = types.slice(0, 2);
  return (
    <div id="renderDiv" role="region" aria-labelledby="pokemon-name">
      <div id="pokeDataHolder">
        <div>
          <h1 id="pokemon-name">{capitalizeFirstLetter(name)}</h1>
          {bgImage && <img id="pokebg" src={bgImage} alt="" />}
          <img id="pokeImage" src={image} alt={name} />
          <p id="typepoke">
            Types: {capitalizeFirstLetter(displayTypes.join(", "))}
          </p>
          <div id="pokeHW">
            <p>Height: {height} m</p>
            <p>|</p>
            <p>Weight: {weight} kg</p>
          </div>
          <div id="pokeDescription">
            <h3>Description:</h3>
            <p>{description}</p>
          </div>
          <div id="pokeMoves">
            <h3>Moves:</h3>
            <p>{moves}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const findEnglishDescription = (speciesData) => {
  if (
    speciesData &&
    speciesData.flavor_text_entries &&
    Array.isArray(speciesData.flavor_text_entries)
  ) {
    const englishDescription = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    return englishDescription
      ? englishDescription.flavor_text
      : "English description not found.";
  } else {
    return "English description not found.";
  }
};

export default Render;
