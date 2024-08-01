import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { api_base_url } from "../settings.json";
import { AuthContext } from "../contexts/AuthContext";

function LoginForm() {
  const { setUsername } = useContext(AuthContext)

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = (e) => {
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
      .then(() => {
        setLoading(false);

        // Bouquets abrufen
        return getBouquets().then((bouquets) => {
          setUsername(username)

          // Navigiere zur Profilseite und übergebe die Bouquets
          navigate(`/profile/${username}`, { state: { bouquets } });
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
      <form onSubmit={login}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUser(e.target.value)}
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
