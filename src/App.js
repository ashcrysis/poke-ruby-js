import React from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <Login />
      <Register />
      <Search />
    </div>
  );
}

export default App;
