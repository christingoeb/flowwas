import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  CircularProgress,
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  TextField,
  Grid,
  Container,
} from "@mui/material";
import FlowerList from "../components/FlowerList";
import BouquetBasket from "../components/BouquetBasket";
import axios from "axios";
import { api_base_url } from "../settings.json";

function Home() {
  const [flower, setFlower] = useState([]);
  const [loading, setLoading] = useState([]);
  const [selectedColors, setColors] = useState([]);
  const inputRef = useRef();
  const colors = [
    "pink",
    "red",
    "green",
    "yellow",
    "purple",
    "white",
    "blue",
    "orange",
  ];

  useEffect(() => {
    getFilteredFlowers(); // default gets all flowers with no set filter
  }, []);

  function getFilteredFlowers(color, searchTerm) {
    setLoading(true);
    axios.get(`${api_base_url}flowers`, {
      params: {
        color,
        searchTerm,
      },
      paramsSerializer: {
        indexes: null,
      },
    })
      .then((response) => {
        setFlower(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }

  function getFilteredFlowersOR(color, searchTerm) {
    setLoading(true);
    axios.get(`${api_base_url}flowers-or`, {
      params: {
        color,
        searchTerm,
      },
      paramsSerializer: {
        indexes: null,
      },
    })
      .then((response) => {
        setFlower(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
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

  const handleColorChange = (event) => {
    const {
      target: { value },
    } = event;
    setColors(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Grid container spacing={2}>
      <Container sx={{ p: "2rem" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Stell dir deinen ganz eigenen Blumenstrauß zusammen
        </Typography>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
        >
          <TextField
            type="text"
            label="Stichworte"
            variant="outlined"
            placeholder="Nach Blumen suchen"
            inputRef={inputRef}
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
              onChange={handleColorChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Farbfilter" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <div
                      key={value}
                      style={{
                        borderRadius: "15px",
                        background: "rgba(0, 0, 0, 0.08)",
                        padding: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          background: value,
                          width: 15,
                          height: 15,
                          borderRadius: "50%",
                          marginRight: "0.5rem",
                          border: "1px black solid",
                        }}
                      ></div>
                      <div>{value}</div>
                    </div>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {colors.map((name) => (
                <MenuItem key={name} value={name}>
                  <div
                    style={{
                      background: name,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      marginRight: "1rem",
                      border: "1px black solid",
                    }}
                  ></div>
                  <div>{name}</div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ background: "#ffb6c1 !important" }}
            onClick={() =>
              getFilteredFlowers(selectedColors, inputRef.current.value.split(" "))
            }
          >
            Filter anwenden
          </Button>
        </div>
        {(!flower || flower.length === 0) && !loading ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
          >
            <p>Keine Blumen gefunden :c</p>
            <Button
              variant="contained"
              sx={{ background: "#ffb6c1 !important", ml: "1rem" }}
              onClick={() =>
                getFilteredFlowersOR(selectedColors, inputRef.current.value.split(" "))
              }
            >
              Suche erweitern?
            </Button>
          </div>
        ) : (
          <>
            {loading && <CircularProgress />}
            <FlowerList flowerData={flower} />
          </>
        )}
      </Container>
      <BouquetBasket />
    </Grid>
  );
}

export default Home;
