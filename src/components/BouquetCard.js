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

function BouquetCard({ bouquets }) {
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Card sx={{ display: "flex", alignItems: "center", padding: "1rem" }}>
        <Typography>{bouquets.name}</Typography>
        {bouquets.flowers && bouquets.flowers.length > 0 ? (
          <>
            {bouquets.flowers.map((bouquetsFlowersData, index) => (
              <Box key={bouquetsFlowersData.id} mb={2} width="100%">
                <Typography key={index}>
                  {bouquetsFlowersData.latin_name}
                </Typography>
              </Box>
            ))}
          </>
        ) : (
          <Typography variant="body1">da ist was schief gelaufen </Typography>
        )}

        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ marginRight: "1rem" }}
        />
        <IconButton aria-label="delete" color="primary">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="create" color="primary">
          <CreateIcon />
        </IconButton>
      </Card>
    </Typography>
  );
}

export default BouquetCard;
