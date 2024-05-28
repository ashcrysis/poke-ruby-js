import React, { useState } from "react";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/v2/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        alert("Login successful!");
      } else {
        alert("Login failed! Please check your credentials and try again.");
      }
      const data = await response.json();
      console.log(data); // Handle response accordingly
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed! Please try again.");
    }
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
      </div>
    </div>
  );
};

export default Login;
