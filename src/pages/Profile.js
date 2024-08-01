import React, { useState, useContext, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import BouquetCard from "../components/BouquetCard";
import { AuthContext } from "../contexts/AuthContext";

function Profile() {
  const location = useLocation();
  const [bouquets, setBouquets] = useState([]);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    const getBouquets = () => {
      try {
        if (location.state.bouquets === null) {
          console.log("Bouquets are null");
        } else {
          console.log("Bouquets:", location.state.bouquets);
          setBouquets(location.state.bouquets);
        }
      } catch (error) {
        console.error(
          "An error occurred while accessing location.state.bouquets:",
          error
        );
      }
    };
    getBouquets(); // default gets all flowers with no set filter
  }, [location.state]);

  if (!username) {
    return <div>Nicht angemeldet. Melde dich bitte an c:</div>;
  }
  //frage: wie kann ich die sofort anzeigen? ;-(
  // bisher geht es nur, wenn man auf den button bouquets drückt

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Hier sind deine erstellten Blumensträuße, {username}!
        {bouquets.length > 0 ? (
          bouquets.map((bouquetData) => (
            <Box key={bouquetData.id} mb={2} width="100%">
              <BouquetCard bouquets={bouquetData} />
            </Box>
          ))
        ) : (
          <Typography variant="body1">
            Keine Blumensträuße gefunden. :c
          </Typography>
        )}
      </Typography>
    </Container>
  );
}

export default Profile;
