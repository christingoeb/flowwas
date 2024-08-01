import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import {
  useParams,
  useNavigate,
  useLocation,
  useLoaderData,
} from "react-router-dom";
import BouquetCard from "../components/BouquetCard";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(null);
  const [bouquets, setBouquets] = useState([]);
  const getBouquets = () => {
    try {
      if (location.state.bouquets === null) {
        console.log("Bouquets are null");
      } else {
        console.log("Bouquets:", location.state.bouquets);
        setBouquets(location.state.bouquets);
      }
    } catch (error) {
      console.error(
        "An error occurred while accessing location.state.bouquets:",
        error
      );
    }
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [id, navigate]);
  useEffect(() => {
    getBouquets(); // default gets all flowers with no set filter
  }, []);

  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Hier sind deine erstellten Blumensträuße, {username}!
        {/* <Button aria-label="add" color="primary" onClick={() => getBouquets()}>
          bouquets
        </Button> */}
        {bouquets.length > 0 ? (
          bouquets.map((bouquetData) => (
            <Box key={bouquetData.id} mb={2} width="100%">
              <BouquetCard bouquets={bouquetData} />
            </Box>
          ))
        ) : (
          <Typography variant="body1">
            Keine Blumensträuße gefunden. :c
          </Typography>
        )}
      </Typography>
    </Container>
  );
}

export default Profile;
