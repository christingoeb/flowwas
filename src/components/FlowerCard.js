import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Divider,
  IconButton
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function FlowerCard({ flower }) {
  const showDetailed = () => {
    window.open("https://www.wikipedia.de", "_blank");
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Card sx={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
        <CardMedia
          component="img"
          sx={{ width: '200px', height: '200px' }}
          image={`${process.env.PUBLIC_URL}/flower_images/` + flower.image}
          alt={flower.name}
        />
        <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: '1rem' }} />
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

            {flower.description.length > 300 ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  {isDropdownVisible
                    ? flower.description
                    : flower.description.slice(0, 300) + "..."}
                </Typography>
                <Button onClick={handleToggleDropdown}>
                  {isDropdownVisible
                    ? "weniger anzeigen..."
                    : "weiterlesen..."}
                </Button>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {flower.description}
              </Typography>
            )}
          </CardContent>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem sx={{ marginRight: '1rem' }} />
        <IconButton aria-label="add" color="primary">
          <AddIcon />
        </IconButton>

      </Card>
    </Typography>
  );
}

export default FlowerCard;
