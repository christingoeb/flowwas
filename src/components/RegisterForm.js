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

function RegisterForm() {
  const { setUsername } = useContext(AuthContext);

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestBody = {
      username: username,
      password: password,
    };

    axios
      .post(`${api_base_url}register`, requestBody, {
        withCredentials: true,
      })
      .then(() => {
        setLoading(false);
        setUsername(username)
          // Navigiere zur Profilseite und übergebe die Bouquets
          navigate("/profile", { state: { bouquets: []} });
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
          <form onSubmit={register}>
            <Box mb={2}>
              <TextField
                label="Nutzername"
                type="text"
                value={username}
                onChange={(e) => setUser(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Passwort"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Passwort wiederholen"
                type="password"
                value={passwordValidation}
                onChange={(e) => setPasswordValidation(e.target.value)}
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
                disabled={loading || password !== passwordValidation}
              >
                {loading ? <CircularProgress size={24} /> : "Registrieren"}
              </Button>
            </Box>
          </form>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterForm;
