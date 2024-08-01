import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { api_base_url } from "../settings.json";
import { AuthContext } from "../contexts/AuthContext";

function LoginForm() {
  const { setUsername } = useContext(AuthContext);

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
          setUsername(username);

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 400, padding: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={login}>
            <Box mb={2}>
              <TextField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUser(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </form>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          <Box mt={2}>
            <Button variant="text" color="primary">
              Noch keinen Account? Hier registrieren!
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginForm;
