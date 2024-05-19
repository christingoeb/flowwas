import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import FLowerList from '../components/FlowerList';

function Home() {
  const [flower, setFlower] = useState([]);

  useEffect(() => {
    // Fetch flowers from an API or define them here
    const fetchedFlowers = [
      { id: 1, name: 'Flower 1', description: 'Description 1', price: 10, image: '/path/to/image1.jpg' },
      { id: 2, name: 'Flower 2', description: 'Description 2', price: 20, image: '/path/to/image2.jpg' },
      // Add more flowers as needed
    ];
    setFlower(fetchedFlowers);
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <FLowerList flower={flower} />
    </Container>
  );
}

export default Home;
