import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import BouquetCard from "../components/BouquetCard";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api_base_url } from "../settings.json";

function Profile() {
  const [bouquets, setBouquets] = useState([]);
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`${api_base_url}bouquets`, 
        { withCredentials: true })
      .then((response) => {
        setBouquets(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  if (!username) navigate("/login")

  return (
    <Grid container spacing={2} sx={{ p: "2rem", height: "90vH", width: "100vW", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {bouquets.length > 0 ? (
        <Typography variant="h3" component="h1" gutterBottom>
          Hier sind deine erstellten Blumensträuße, {username}!
          {bouquets.map((bouquetData) => (
            <Box key={bouquetData.id} mb={2} width="100%">
              <BouquetCard bouquets={bouquetData} />
            </Box>
          ))}

        </Typography>
      ) : (
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
      )}
    </Grid>
  );
}

export default Profile;
