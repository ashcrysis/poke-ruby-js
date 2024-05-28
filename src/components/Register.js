import React, { useState } from "react";
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
      const response = await fetch("http://localhost:3001/v2/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
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
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Rua"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="pokedex-input"
        />
        <input
          type="text"
          placeholder="Complemento"
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
      </div>
    </div>
  );
};

export default Register;
