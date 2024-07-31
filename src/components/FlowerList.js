import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import FlowerCard from "./FlowerCard";
import SearchBar from "./SearchBar";

function FlowerList({ flowerData }) {
  const [filteredFlowers, setFilteredFlowers] = useState(flowerData);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = flowerData.filter(
      (flowerData) =>
        flowerData.name.toLowerCase().includes(lowerCaseQuery) ||
        flowerData.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredFlowers(filtered);
  };
  useEffect(() => {
    setFilteredFlowers(flowerData);
  }, [flowerData]);
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      <Box display="flex" flexDirection="column" alignItems="center">
        <SearchBar onSearch={handleSearch} />
        {filteredFlowers.length > 0 ? ( // Conditional rendering
          filteredFlowers.map((flowerData) => (
            <Box key={flowerData.id} mb={2} width="100%">
              <FlowerCard flower={flowerData} />
            </Box>
          ))
        ) : (
          <p>Keine Blumen gefunden. :c</p> // Message when no flowers are available
        )}
      </Box>
    </Typography>
  );
}

export default FlowerList;
