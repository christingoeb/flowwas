import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import FlowerList from "../components/FlowerList";
import axios from "axios";

/* import axiosWrapper from '../axios';
 */import { api_base_url } from '../settings.json';

function Home({ flowerData }) {
  const [flower, setFlower] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    getFilteredFlowers(); // default gets all flowers with no set filter
  }, []);

  function getFilteredFlowers(color, searchTerm) {
    setLoading(true)
    axios.get(`${api_base_url}flowers`, {
      params: {
        color,
        searchTerm
      },
      paramsSerializer: {
        indexes: null,
      }
    }).then(response => {
      console.log(response.data)
      setFlower(response.data);
      setLoading(false)
    }).catch(e => {
      console.log(e)
      setLoading(false)
    })
  }


  return (
    <Container>
      {(!flower && !loading) ?
        <p>No flower data available</p>
        : <>
          <Typography variant="h4" component="h1" gutterBottom>
            Stell dir deinen ganz eigenen Blumenstrauß zusammen
          </Typography>
          <FlowerList flowerData={flower} />
        </>}
        { loading && <CircularProgress />}
    </Container>
  );
}

export default Home;
