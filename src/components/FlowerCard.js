import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

function FlowerCard({ flower }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={flower.image}
        alt={flower.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {flower.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {flower.description}
        </Typography>
        <Button variant="contained" color="primary">Add to Cart</Button>
      </CardContent>
    </Card>
  );
}

export default FlowerCard;
