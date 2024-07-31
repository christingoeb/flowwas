import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { api_base_url } from "../settings.json";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestBody = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:3002/login", requestBody, {
        withCredentials: true,
      })
      .then((loginResponse) => {
        console.log(loginResponse);
        const jsonObject = JSON.parse(loginResponse.config.data);
        const userName = jsonObject.username;
        console.log(userName);

        setLoading(false);

        // Bouquets abrufen
        return getBouquets().then((bouquets) => {
          localStorage.setItem("userName", userName);

          // Navigiere zur Profilseite und übergebe die Bouquets
          navigate(`/profile/${userName}`, { state: { bouquets } });
        });
      })
      .catch((error) => {
        setLoading(false);
        setError(
          error.response
            ? error.response.data
            : "An unknown error, while submitting the button, occurred"
        );
      });
  };

  const getBouquets = () => {
    return axios
      .get(`${api_base_url}bouquets`, {
        withCredentials: true,
      })
      .then((response) => {
        // Gibt die Bouquets zurück in einem Array
        return response.data;
      })
      .catch((error) => {
        setError(
          error.response
            ? error.response.data
            : "An unknown error, while getting the bouquets, occurred"
        );
        throw error;
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      <Button aria-label="add" color="primary">
        Noch keinen Account? Hier registrieren!
      </Button>
    </div>
  );
}

export default LoginForm;
