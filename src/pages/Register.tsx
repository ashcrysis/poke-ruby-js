import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { register } from "../services/register.ts";
import { IRegisterPostParams } from "../types/register.ts";

const Register = () => {
  const [formData, setFormData] = useState<IRegisterPostParams>({
    email: "",
    nome: "",
    telefone: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleRegister = async () => {
    var output = await register(formData);
    if (output) {
      navigate("/");
    }
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-content">
        <h2 className="pokedex-title">Register</h2>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleInputChange}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Name"
          id="nome"
          onChange={handleInputChange}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Phone"
          id="telefone"
          onChange={handleInputChange}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Zip/Postal Code"
          id="cep"
          onChange={handleInputChange}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Street"
          id="rua"
          onChange={handleInputChange}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Number"
          id="numero"
          onChange={handleInputChange}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Add-on address"
          id="complemento"
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
        <button onClick={handleRegister} className="pokedex-button">
          Register
        </button>
        <button onClick={() => navigate("/")} className="pokedex-button">
          Have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;
