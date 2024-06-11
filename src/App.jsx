import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Search from "./components/Search.jsx";
import Render from "./components/Render.tsx";
import User from "./components/User.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
                <User />
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
