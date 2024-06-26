import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import FlowerCard from "./FlowerCard";
import SearchBar from "./SearchBar";

function FlowerList({ flower }) {
  const [filteredFlowers, setFilteredFlowers] = useState(flower);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = flower.filter(
      (flower) =>
        flower.name.toLowerCase().includes(lowerCaseQuery) ||
        flower.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredFlowers(filtered);
  };
  useEffect(() => {
    setFilteredFlowers(flower);
  }, [flower]);
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Box display="flex" flexDirection="column" alignItems="center">
        <SearchBar onSearch={handleSearch} />
        {filteredFlowers.map((flower) => (
          <Box key={flower.id} mb={2} width="100%">
            <FlowerCard flower={flower} />
          </Box>
        ))}
      </Box>
    </Typography>
  );
}

export default FlowerList;
