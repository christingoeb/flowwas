import React, { useState, useContext } from "react";
import { BouquetContext } from "../contexts/BouquetContext";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
  Skeleton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../contexts/AuthContext";
import { api_base_url } from "../settings.json";

function FlowerCard({ flower }) {
  const { addItem } = useContext(BouquetContext);
  const { username } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Card sx={{ display: "flex", alignItems: "center", padding: "1rem" }}>
        { loading && <Skeleton variant="rounded" width={200} height={300} /> }
        <CardMedia
          component="img"
          sx={{ width: "200px", height: "300px" }}
          src={`${api_base_url}image/${flower.id}`}
          style={{ display: loading ? 'none' : 'block' }}
          alt={flower.name}
          onLoad={handleImageLoad}
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
        {username && <>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ marginRight: "1rem" }}
          />

          <IconButton
            aria-label="add"
            color="primary"
            onClick={() => addItem(flower)}
          >
            <AddIcon />
          </IconButton>
        </>}
      </Card>
    </Typography>
  );
}

export default FlowerCard;
