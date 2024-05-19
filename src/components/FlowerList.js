import React from 'react';
import { Grid } from '@mui/material';
import FlowerCard from './FlowerCard';

function FLowerList({ flower }) {
  return (
    <Grid container spacing={3}>
      {flower.map(flower => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={flower.id}>
          <FlowerCard flower={flower} />
        </Grid>
      ))}
    </Grid>
  );
}

export default FLowerList;
