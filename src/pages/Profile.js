import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
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

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("userName");

    if (storedUserId && storedUsername) {
      setUsername(storedUsername);

      if (!id) {
        navigate(`/profile/${storedUserId}`);
      }
    } else {
      navigate("/login");
    }
  }, [id, navigate]);

  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Hier sind deine erstellten Blumensträuße, {username}!
      </Typography>
    </Container>
  );
}

export default Profile;
