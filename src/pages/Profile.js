import React, { useState, useContext, useEffect } from "react";
import { Button, Grid, Stack, Typography, CircularProgress } from "@mui/material";
import BouquetCard from "../components/BouquetCard";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api_base_url } from "../settings.json";

function Profile() {
  const [bouquets, setBouquets] = useState([]);
  const { username } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api_base_url}bouquets`,
        { withCredentials: true })
      .then((response) => {
        setBouquets(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (!username) navigate("/login")

  return (
    <Grid container spacing={2} sx={{ p: "2rem", minHeight: "90vH", width: "99vW", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {bouquets.length > 0 ? (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Hier sind deine erstellten Blumensträuße, {username}!
          </Typography>
          <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
            {bouquets.map((bouquetData) => (
              <BouquetCard bouquet={bouquetData} key={bouquetData.bouquetId} />
            ))}
          </Grid>
        </Stack>
      ) : !loading ? (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body1" gutterBottom sx={{ mr: "1rem" }}>
            Du hast noch keine Blumensträuße erstellt :c
          </Typography>
          <Button color="primary" onClick={() => navigate("/")}>
            Erstelle jetzt deinen ersten Blumenstrauß!
          </Button>
        </Stack>
      ) : <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CircularProgress size={50} />
      </Stack>}
    </Grid>
  );
}

export default Profile;
