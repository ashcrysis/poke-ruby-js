import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.ts";
import { IPokemonData } from "../../pages/Search.tsx";
import { Skeleton } from "antd";

import "../../App.css";

interface PokemonDataProps {
  pokemonData: IPokemonData;
}

const PokemonData: React.FC<PokemonDataProps> = (props) => {
  const { name, types, image, height, weight, moves } = props.pokemonData;

  const [description, setDescription] = useState("Loading...");
  const [bgImage, setBgImage] = useState("");
  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  const loadBgImg = async (type?: string) => {
    const logo = await import(`../../assets/poke-bgs/${type || "normal"}.png`);
    setBgImage(logo.default);
  };

  useEffect(() => {
    const fetchPokemonSpeciesData = async (pokemonName: string) => {
      const authorizationHeader = localStorage.getItem("authorizationHeader");
      if (!authorizationHeader) {
        console.error("Authorization token not found");
        return;
      }
      const apiUrl = `${
        process.env.REACT_APP_API_URL
      }/v2/pokemons/species?name=${pokemonName.split("-")[0]}`;

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

    const fetchData = async () => {
      await loadBgImg(types[0]);
      await fetchPokemonSpeciesData(name);
      setBgImageLoaded(true);
    };

    fetchData();
  }, [name, types]);

  const displayTypes = types.slice(0, 2);

  return (
    <div id="PokemonDataDiv" role="region" aria-labelledby="pokemon-name">
      <div id="pokeDataHolder">
        <Skeleton
          loading={!bgImageLoaded}
          active
          avatar={{ shape: "square", size: 460 }}
          className="skeleton-bg"
        />
        <Skeleton loading={!bgImageLoaded} active className="skeleton-bg" />
        {bgImageLoaded && (
          <>
            <img id="pokebg" src={bgImage} alt="" />
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
          </>
        )}
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

export default PokemonData;
