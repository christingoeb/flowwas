// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Erstelle den Kontext
export const AuthContext = createContext();

// Erstelle einen Provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Überprüfe, ob der Benutzer eingeloggt ist
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3002/login", {
        username,
        password,
      });
      const userId = response.data.id;
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", response.data.username);
      setIsLoggedIn(true);
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3002/logout");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
