import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
} from "@mui/material";

function BouquetFlowerCard({ bouquetid, flower }) {
  const showDetailed = () => {
    //window.open("https://www.wikipedia.de", "_blank");
  };

  // Remove Flower Funktionalität
  const removeFlower = () => {
    // Frage: ID soll aus der Liste des Bouquets gelöscht werden
    console.log(flower.id);
  };

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Card sx={{ display: "flex", alignItems: "center", padding: "1rem" }}>
        <CardMedia
          component="img"
          sx={{ width: "250px", height: "250px" }}
          image={`${process.env.PUBLIC_URL}/flower_images/` + flower.image}
          alt={flower.name}
        />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ marginLeft: "1rem" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
          }}
        >
          <CardContent>
            <Box
              onClick={showDetailed}
              sx={{
                cursor: "pointer",
                paddingBottom: 1,
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {flower.name}
              </Typography>
            </Box>
            {flower.associations.length > 0 ? (
              flower.associations.map((flowerAssociations) => (
                <Box key={flowerAssociations.id} width="100%">
                  <Typography variant="body2" color="text.secondary">
                    {flowerAssociations}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary"></Typography>
            )}
          </CardContent>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ marginRight: "1rem" }}
        />
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => removeFlower(bouquetid)}
        >
          <DeleteIcon />
        </IconButton>
      </Card>
    </Typography>
  );
}

export default BouquetFlowerCard;
