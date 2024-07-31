import React, { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import {
  useParams,
  useNavigate,
  useLocation,
  useLoaderData,
} from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(null);

  const storedUsername = localStorage.getItem("userName");

  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [id, navigate]);

  if (!username) {
    return <div>Loading...</div>;
  }
  const getBouquets = () => {
    try {
      if (location.state.bouquets === null) {
        console.log("Bouquets are null");
      } else {
        console.log("Bouquets:", location.state.bouquets);
      }
    } catch (error) {
      console.error(
        "An error occurred while accessing location.state.bouquets:",
        error
      );
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Hier sind deine erstellten Blumensträuße, {username}!
        <Button aria-label="add" color="primary" onClick={() => getBouquets()}>
          bouquets
        </Button>
      </Typography>
    </Container>
  );
}

export default Profile;
