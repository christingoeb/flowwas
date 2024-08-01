import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import FlowerCard from "./FlowerCard";

function FlowerList({ flowerData }) {
  const [filteredFlowers, setFilteredFlowers] = useState(flowerData);

  useEffect(() => {
    setFilteredFlowers(flowerData);
  }, [flowerData]);
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Box display="flex" flexDirection="column" alignItems="center">
        {filteredFlowers.map((flowerData) => (
          <Box key={flowerData.id} mb={2} width="100%">
            <FlowerCard flower={flowerData} />
          </Box>
        ))}
      </Box>
    </Typography>
  );
}

export default FlowerList;
