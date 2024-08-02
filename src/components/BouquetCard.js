import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  CardActions,
  Button,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

function BouquetCard({ bouquet }) {
  const navigate = useNavigate();

  const getAssociations = () => {
    const associations = new Set();
    bouquet.flowers.forEach(flower => {
      flower.associations.forEach(association => {
        associations.add(association)
      })
    });
    return Array.from(associations)
  }

  const seeDetails = () => {
    navigate(`/bouquet/${bouquet.bouquetId}`, {
      state: { bouquet },
    });
  };


  return (
    <Card sx={{ maxWidth: 360, margin: "1rem" }}>
      <Carousel
        autoPlay={false}
        animation={"fade"}
        indicators={true}
        duration={500}
        navButtonsAlwaysVisible={false}
        navButtonsAlwaysInvisible={false}
        cycleNavigation={true}
        fullHeightHover={true}
        swipe={true}
      >
        {bouquet.flowers.map(flower => {
          return (
            <CardMedia
              sx={{ height: 142 }}
              image={`${process.env.PUBLIC_URL}/flower_images/` + flower.image}
              title={flower.name}
            />)
        })}
      </Carousel>
      <CardContent sx={{ height: 110 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {bouquet.name}
        </Typography>
        <Divider sx={{ marginBottom: "0.5rem" }} />
        <div>
          {getAssociations().slice(0, 5).map(term =>
            <Chip label={term} variant="outlined" sx={{ marginRight: "0.25rem", marginTop: "0.25rem" }} />
          )}
          {getAssociations().length > 5 && <Chip label={`+ ${getAssociations().length - 5} weitere`} sx={{ marginTop: "0.25rem" }} />}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={seeDetails}>Anschauen</Button>
      </CardActions>
    </Card>
  );
}

export default BouquetCard;
