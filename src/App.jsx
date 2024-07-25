import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Search from "./pages/Search.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";

import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#e53935",
          borderRadius: 4,

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
