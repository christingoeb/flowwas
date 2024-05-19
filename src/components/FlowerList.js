import React from 'react';
import { Box } from '@mui/material';
import FlowerCard from './FlowerCard';

function FLowerList({ flower }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {flower.map(flower => (
        <Box key={flower.id} mb={2} width="100%">
          <FlowerCard flower={flower} />
        </Box>
      ))}
    </Box>
  );
}

export default FLowerList;
