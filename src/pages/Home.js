import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import FlowerList from "../components/FlowerList";

function Home() {
  const [flower, setFlower] = useState([]);

  useEffect(() => {
    // Fetch flowers from an API or define them here
    const fetchedFlowers = [
      {
        id: 1,
        name: "Akazie",
        description:
          "Die Akazien (Acacieae) sind eine Tribus in der Unterfamilie Mimosengewächse (Mimosoideae) innerhalb der Pflanzenfamilie der Hülsenfrüchtler (Fabaceae). Die etwa 1400 Arten sind von den Subtropen bis Tropen der Neuen und Alten Welt weitverbreitet. Die 950 Arten der Gattung Acacia kommen überwiegend in Australien vor.",
        image: "../../flower_images/1_Acacieae.png",
      },
      {
        id: 2,
        name: "Blume 2",
        description: "Beschreibung 2",
        price: 20,
        image: "/path/to/image2.jpg",
      },
      // Add more flowers as needed
    ];
    setFlower(fetchedFlowers);
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Stell dir deinen eigenen Blumenstrauß zusammen
      </Typography>
      <FlowerList flower={flower} />
    </Container>
  );
}

export default Home;
