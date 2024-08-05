import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Divider,
  Skeleton
} from "@mui/material";
import { api_base_url } from "../settings.json";

function BouquetFlowerCard({ flower }) {
  const [loading, setLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Card sx={{ display: "flex", alignItems: "center", padding: "1rem" }}>
        {loading && <Skeleton variant="rounded" width={200} height={300} />}
        <CardMedia
          component="img"
          sx={{ width: "200px", height: "300px" }}
          image={`${api_base_url}image/${flower.id}`}
          onLoad={handleImageLoad}
          style={{ display: loading ? 'none' : 'block' }}
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
              sx={{ paddingBottom: 1 }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {flower.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontStyle: "italic" }}
              >
                {flower.latin_name}
              </Typography>
            </Box>
            <Divider sx={{ mx: "1rem", mb: "1rem" }} />
            <Box sx={{ mb: "1rem" }}>
              {flower.associations.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
                      <Typography variant="body2" component="div">
                        {association}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography gutterBottom variant="h4" component="div">
                  keine Assoziation
                </Typography>
              )}
            </Box>

            {flower.description.length > 300 ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  {isDropdownVisible
                    ? flower.description
                    : flower.description.slice(0, 300) + "..."}
                </Typography>
                <Button onClick={handleToggleDropdown}>
                  {isDropdownVisible ? "weniger anzeigen..." : "weiterlesen..."}
                </Button>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {flower.description}
              </Typography>
            )}
          </CardContent>
        </Box>
      </Card>
    </Typography>
  );
}

export default BouquetFlowerCard;
