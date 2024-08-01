import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Button, TextField } from "@mui/material";
import FlowerList from "../components/FlowerList";
import axios from "axios";
import { api_base_url } from '../settings.json';

function Home({ flowerData }) {
  const [flower, setFlower] = useState([]);
  const [loading, setLoading] = useState([]);
  const [selectedColors, setColors] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  const names = [
    "pink",
    "red",
    "green",
    "yellow",
    "purple",
    "white",
    "blue",
    "orange"
  ];

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
      setFlower(response.data);
      setLoading(false)
    }).catch(e => {
      console.error(e)
      setLoading(false)
    })
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };


  const handleChange = (event) => {
    const { target: { value } } = event;
    setColors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
        Stell dir deinen ganz eigenen Blumenstrauß zusammen
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", "marginBottom": "1rem" }}>
        <TextField
          label="Stichworte"
          variant="outlined"
          placeholder="Nach Blumen suchen"
          value={searchTerms}
          onChange={(e) => { setSearchTerms(e.target.value) }}
          sx={{ mr: 2, width: 450 }}
        />
        <FormControl sx={{ mr: 2, width: 200 }}>
          <InputLabel id="color-input">Farbfilter</InputLabel>
          <Select
            labelId="color-input-label"
            id="color-input"
            multiple
            autoWidth
            value={selectedColors}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Farbfilter" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <div key={value} style={{ borderRadius: "15px", background: "rgba(0, 0, 0, 0.08)", padding: "0.5rem", display: 'flex', alignItems: 'center' }}>
                    <div style={{ background: value, width: 15, height: 15, borderRadius: "50%", marginRight: "0.5rem", border: "1px black solid" }}></div>
                    <div>{value}</div>
                  </div>

                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                <div style={{ background: name, width: 30, height: 30, borderRadius: "50%", marginRight: "1rem", border: "1px black solid" }}></div>
                <div>{name}</div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => getFilteredFlowers(selectedColors, searchTerms.split(" "))}>Filter anwenden</Button>
      </div>
      {(!flower && !loading) ?
        <p>Keine Blumen gefunden :c</p>
        :
        <>
          {loading && <CircularProgress />}
          <FlowerList flowerData={flower} />
        </>
      }
    </Container>
  );
}

export default Home;
