import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import FlowerCard from "./FlowerCard";
import { BouquetContext } from "../contexts/CreateBouquetContext";


function FlowerList({ flowerData }) {
  const { flowers } = useContext(BouquetContext)

  const renderFlowers = (flowerData) => {
    if (!flowers.find(flower => flower.id === flowerData.id)) {
      return (<Box key={flowerData.id} mb={2} width="100%">
        <FlowerCard flower={flowerData} />
      </Box>)
    };
    return (<></>)
  }

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Box display="flex" flexDirection="column" alignItems="center">
        {flowerData.map((flower) => (
          renderFlowers(flower)
        ))}
      </Box>
    </Typography>
  );
}

export default FlowerList;
