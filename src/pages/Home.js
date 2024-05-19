import React from 'react';
import { Typography, Container } from '@mui/material';

function Home() {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Flowwas
      </Typography>
      <Typography variant="h5" component="h2" paragraph>
        Your one-stop shop for all your needs.
      </Typography>
    </Container>
  );
}

export default Home;
