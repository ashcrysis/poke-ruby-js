import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Render from "./components/render";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  const [pokemonData, setPokemonData] = useState(null);

  const handlePokemonData = (data) => {
    setPokemonData(data);
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/search"
            element={
              <div className="App">
                <Search setPokemonData={handlePokemonData} />
                {pokemonData && <Render {...pokemonData} />}
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
