import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BouquetFlowerCard from "../components/BouquetFlowerCard";
import DeleteIcon from "@mui/icons-material/Delete";

function BouquetDetail() {
  const location = useLocation();

  const navigate = useNavigate();
  const { bouquet } = location.state || {};

  if (!bouquet) {
    return <Typography>Keine Bouquet-Daten verfügbar.</Typography>;
  }
  const handleBackClick = () => {
    navigate(-1); // Navigiert zur vorherigen Seite zurück
  };
  const handleRemoveBouquet = () => {
    console.log(bouquet.bouquetid);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleBackClick}>
          Zurück zur deinen Bouquets.
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {bouquet.name}
        </Typography>
        <Button
          aria-label="delete"
          color="primary"
          onClick={() => handleRemoveBouquet(bouquet.bouquetId)}
        >
          Dieses Bouquet löschen.
        </Button>
      </Box>
      <Box>
        {bouquet.flowers && bouquet.flowers.length > 0 ? (
          bouquet.flowers.map((flower) => (
            <BouquetFlowerCard bouquetid={bouquet.bouquetId} flower={flower} />
          ))
        ) : (
          <Typography variant="body1">Keine Blumen vorhanden.</Typography>
        )}
      </Box>
    </Container>
  );
}

export default BouquetDetail;
