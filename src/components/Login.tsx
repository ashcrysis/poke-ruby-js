import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { login } from "../components/services/login.ts";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    await login(email, password);
    navigate("/search");
  };
  return (
    <div className="pokedex-container">
      <div className="pokedex-content">
        <h2 className="pokedex-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pokedex-input"
        />
        <button onClick={handleLogin} className="pokedex-button">
          Login
        </button>
        {username && <p className="pokedex-greeting">Hello, {username}</p>}{" "}
        <button
          onClick={() => navigate("/register")}
          className="pokedex-button"
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;
