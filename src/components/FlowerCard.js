import React, { useState, useContext } from "react";
import { BouquetContext } from "../contexts/CreateBouquetContext";
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
import AddIcon from "@mui/icons-material/Add";

function FlowerCard({ flower }) {
  const showDetailed = () => {
    //window.open("https://www.wikipedia.de", "_blank");
  };

  const { addItem } = useContext(BouquetContext);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Card sx={{ display: "flex", alignItems: "center", padding: "1rem" }}>
        <CardMedia
          component="img"
          sx={{ width: "200px", height: "300px" }}
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
      </Card>
    </Typography>
  );
}

export default FlowerCard;
