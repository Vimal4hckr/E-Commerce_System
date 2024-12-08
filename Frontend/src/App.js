// App.js
import React from "react";
import "./App.css";
import Register from "./components/RegisterComponent/Register.js";
import Login from "./components/LoginComponent/Login.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomeComponent/Home.js";
import { AuthProvider } from "./components/AuthContext.js";
const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
