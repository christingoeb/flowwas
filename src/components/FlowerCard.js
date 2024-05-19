import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

function FlowerCard({ flower }) {
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ width: 140, height: 140 }}
        image={flower.image}
        alt={flower.name}
      />
       <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1', marginBottom: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {flower.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {flower.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
          <Button variant="contained" color="primary">+</Button>
        </Box>
      </Box>
    </Card>
  );
}

export default FlowerCard;
