import React, { useState, useEffect } from "react";
import "../App.css";
// @ts-ignore
//import defaultBg from "../poke-bgs/normal.png";
interface RenderProps {
  name: string;
  types: string[];
  image: string;
  height: number;
  weight: number;
  moves: string[];
}
const Render: React.FC<RenderProps> = ({
  name,
  types,
  image,
  height,
  weight,
  moves,
}) => {
  const [description, setDescription] = useState("Loading...");
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const fetchPokemonSpeciesData = async (pokemonName: string) => {
      const authorizationHeader = localStorage.getItem("authorizationHeader");
      if (!authorizationHeader) {
        console.error("Authorization token not found");
        return;
      }
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
  }, [name, types]);
  const displayTypes = types.slice(0, 2);
  return (
    <div id="renderDiv" role="region" aria-labelledby="pokemon-name">
      <div id="pokeDataHolder">
        <div>
          <h1 id="pokemon-name">{capitalizeFirstLetter(name)}</h1>
          <div
            id="pokebg"
            style={{
              backgroundImage: `url("../poke-bgs/${types[0]}.png")`,
            }}
          />
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
interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface SpeciesData {
  flavor_text_entries: FlavorTextEntry[];
}
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const findEnglishDescription = (speciesData: SpeciesData) => {
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
