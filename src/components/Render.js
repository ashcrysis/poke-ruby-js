"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = void 0;
const react_1 = __importStar(require("react"));
require("../App.css");
// @ts-ignore
const normal_png_1 = __importDefault(require("../poke-bgs/normal.png"));
const Render = ({ name, types, image, height, weight, moves, }) => {
    const [description, setDescription] = (0, react_1.useState)("Loading...");
    const [bgImage, setBgImage] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        var _a;
        const fetchPokemonSpeciesData = (pokemonName) => __awaiter(void 0, void 0, void 0, function* () {
            const authorizationHeader = localStorage.getItem("authorizationHeader");
            if (!authorizationHeader) {
                console.error("Authorization token not found");
                return;
            }
            console.log(pokemonName);
            const apiUrl = `${process.env.REACT_APP_API_URL}/v2/pokemons/species?name=${pokemonName}`;
            try {
                const response = yield fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authorizationHeader}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = yield response.json();
                setDescription(data.description);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        });
        fetchPokemonSpeciesData(name);
        (_a = `../poke-bgs/${types[0]}.png`, Promise.resolve().then(() => __importStar(require(_a)))).then((image) => setBgImage(image.default))
            .catch((error) => {
            console.error("Error importing image:", error);
            setBgImage(normal_png_1.default);
        });
    }, [name, types]);
    const displayTypes = types.slice(0, 2);
    return (react_1.default.createElement("div", { id: "renderDiv", role: "region", "aria-labelledby": "pokemon-name" },
        react_1.default.createElement("div", { id: "pokeDataHolder" },
            react_1.default.createElement("div", null,
                react_1.default.createElement("h1", { id: "pokemon-name" }, (0, exports.capitalizeFirstLetter)(name)),
                bgImage && react_1.default.createElement("img", { id: "pokebg", src: bgImage, alt: "" }),
                react_1.default.createElement("img", { id: "pokeImage", src: image, alt: name }),
                react_1.default.createElement("p", { id: "typepoke" },
                    "Types: ",
                    (0, exports.capitalizeFirstLetter)(displayTypes.join(", "))),
                react_1.default.createElement("div", { id: "pokeHW" },
                    react_1.default.createElement("p", null,
                        "Height: ",
                        height,
                        " m"),
                    react_1.default.createElement("p", null, "|"),
                    react_1.default.createElement("p", null,
                        "Weight: ",
                        weight,
                        " kg")),
                react_1.default.createElement("div", { id: "pokeDescription" },
                    react_1.default.createElement("h3", null, "Description:"),
                    react_1.default.createElement("p", null, description)),
                react_1.default.createElement("div", { id: "pokeMoves" },
                    react_1.default.createElement("h3", null, "Moves:"),
                    react_1.default.createElement("p", null, moves))))));
};
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const findEnglishDescription = (speciesData) => {
    if (speciesData &&
        speciesData.flavor_text_entries &&
        Array.isArray(speciesData.flavor_text_entries)) {
        const englishDescription = speciesData.flavor_text_entries.find((entry) => entry.language.name === "en");
        return englishDescription
            ? englishDescription.flavor_text
            : "English description not found.";
    }
    else {
        return "English description not found.";
    }
};
exports.default = Render;
