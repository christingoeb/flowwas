import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import FlowerList from "../components/FlowerList";

function Home({ flowerData }) {
  const [flower, setFlower] = useState([]);
  console.log(typeof flower);
  if (!flowerData) {
    console.log("no flowers");
  } else {
    console.log("yes flowers");
  }

  useEffect(() => {
    // pre-defined flower data
    const fetchedFlowers = [
      {
        id: 1,
        name: "Akazie",
        description:
          "Die Akazien (Acacieae) sind eine Tribus in der Unterfamilie Mimosengewächse (Mimosoideae) innerhalb der Pflanzenfamilie der Hülsenfrüchtler (Fabaceae). Die etwa 1400 Arten sind von den Subtropen bis Tropen der Neuen und Alten Welt weitverbreitet. Die 950 Arten der Gattung Acacia kommen überwiegend in Australien vor.",
        image: "../../flower_images/1_Acacieae.png",
      },
    ];
    setFlower(fetchedFlowers);
  }, []);

  if (!flowerData) {
    return <p>No flower data available</p>;
  } else {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Stell dir deinen eigenen Blumenstrauß zusammen
        </Typography>
        <FlowerList flowerData={flowerData} />
      </Container>
    );
  }
}

export default Home;
