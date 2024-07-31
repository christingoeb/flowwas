import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { api_base_url } from '../settings.json';

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
        withCredentials: true
      })
      .then((response) => {
        console.log(response)
        setLoading(false);
        const userName = response.data.username;
        const userId = 30;
        // frage: wie komme ich an die userId von der eingeloggten person?
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        /* hab ich rausgenommen um das mit den bouquets zu testen, kann dann sonst auch wieder rein 
        navigate(`/profile/${userId}`); */
      })
      .catch((error) => {
        setLoading(false);
        setError(
          error.response ? error.response.data : "An unknown error occurred"
        );
      });
  };

  const getBouquets = () => {
    console.log('bo')
    axios.get(`${api_base_url}bouquets`, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        setError(
          error.response ? error.response.data : "An unknown error occurred"
        );
      });
  }

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

      <Button aria-label="add" color="primary" onClick={() => getBouquets()}>
        bouquets
      </Button>
    </div>
  );
}

export default LoginForm;
