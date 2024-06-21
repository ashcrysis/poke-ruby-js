import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Search from "./pages/Search.tsx";
import User from "./pages/User.tsx";

import "./App.css";

function App() {
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
                <Search />
                <User />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
