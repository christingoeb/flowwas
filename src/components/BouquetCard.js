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
      <CardMedia
        sx={{ height: 140 }}
        image={`${process.env.PUBLIC_URL}/flower_images/` + bouquet.flowers[0].image}
        title={bouquet.name}
      />
      <CardContent sx={{height: 110}}>
        <Typography gutterBottom variant="h5" component="div">
          {bouquet.name}
        </Typography>
        <Divider  sx={{marginBottom: "0.5rem"}}/>
        <div>
          {getAssociations().slice(0, 5).map(term =>
              <Chip label={term} variant="outlined" sx={{marginRight: "0.25rem", marginTop: "0.25rem"}}/>
          )}
          {getAssociations().length > 5 && <Chip label={`+ ${getAssociations().length - 5 } weitere`} sx={{marginTop: "0.25rem"}}/>}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={seeDetails}>Anschauen</Button>
      </CardActions>
    </Card>
  );
}

export default BouquetCard;
