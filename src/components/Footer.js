import React from 'react';
import { Typography, Box } from '@mui/material';

function Footer() {
  return (
    <Box mt={5} p={3} bgcolor="text.secondary" color="white">
      <Typography variant="body1" align="center">
        &copy; 2024 Flowwas. All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
