import React, { useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

function BouquetCard({ bouquets }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bouquet/${bouquets.bouquetId}`, {
      state: { bouquet: bouquets },
    });
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        marginBottom: "1rem",
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bouquets.name}
        </Typography>

        {bouquets.flowers && bouquets.flowers.length > 0 && (
          <CardMedia
            component="img"
            height="140"
            image={
              `${process.env.PUBLIC_URL}/flower_images/` +
              bouquets.flowers[0].image
            }
            alt={bouquets.flowers[0].latin_name}
            sx={{ marginBottom: "1rem" }}
          />
        )}

        <Box>
          {bouquets.flowers && bouquets.flowers.length > 0 ? (
            bouquets.flowers.map((flower) => (
              <Box key={flower.id} mb={2}>
                <Typography variant="body1">
                  <strong>Name:</strong> {flower.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Color:</strong> {flower.color}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">
              Da ist etwas schief gelaufen.
            </Typography>
          )}
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", padding: "0.5rem" }}
      >
        <IconButton aria-label="delete" color="primary">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="create" color="primary">
          <CreateIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

export default BouquetCard;
