import React from "react";
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
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0.5rem",
          }}
        >
          <IconButton aria-label="create" color="primary" onClick={handleClick}>
            <CreateIcon />
          </IconButton>
        </Box>
        <Typography gutterBottom variant="h2" component="h2">
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
                <Typography variant="h4" component="h4">
                  {flower.name}
                </Typography>
                {flower.associations.map((association, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: "4px 8px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "4px",
                      fontSize: "0.875rem", // smaller font size
                    }}
                  >
                    <Typography variant="body1">{association}</Typography>
                  </Box>
                ))}
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
    </Card>
  );
}

export default BouquetCard;
