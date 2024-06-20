import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const requestBody = JSON.stringify({
        user: {
          email,
          nome,
          telefone,
          cep,
          rua,
          numero,
          complemento,
          password,
        },
      });
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert("Registration failed! Please try again.");
      }
      console.log("Response Data:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-content">
        <h2 className="pokedex-title">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Phone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Zip/Postal Code"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Street"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Add-on address"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
