import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

function FlowerDetail() {
  const { flowerId } = useParams();

  // Fetch the flower details using the flowerId
  const flower = {
    id: flowerId,
    name: `Blume ${flowerId}`,
    description: `Beschreibung der Blume ${flowerId}`,
    price: 20,
    image: `/path/to/image${flowerId}.jpg`
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {flower.name}
      </Typography>
      <img src={flower.image} alt={flower.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <Typography variant="body1" paragraph>
        {flower.description}
      </Typography>
      <Button variant="contained" color="primary">Zu Blumenstrauß hinzufügen</Button>
    </Container>
  );
}

export default FlowerDetail;
