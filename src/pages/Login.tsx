import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { login } from "../services/login.ts";

interface IFormData {
  email: string;
  password: string;
  username?: string;
}

const Login = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    var output = await login(email, password);
    if (output) {
      navigate("/search");
    }
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-content">
        <h2 className="pokedex-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleInputChange}
          className="pokedex-input"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleInputChange}
          className="pokedex-input"
        />
        <button onClick={handleLogin} className="pokedex-button">
          Login
        </button>
        {formData.username && (
          <p className="pokedex-greeting">Hello, {formData.username}</p>
        )}
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
