import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Button, Link, Breadcrumbs, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BouquetFlowerCard from "../components/BouquetFlowerCard";
import { BouquetContext } from "../contexts/BouquetContext";
import { api_base_url } from "../settings.json";
import axios from "axios";

function BouquetDetail() {
  const location = useLocation();
  const { setFlowers, setBouquetInfo } = useContext(BouquetContext)
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const { bouquet } = location.state || {};

  if (!bouquet) {
    return <Typography>Keine Bouquet-Daten verfügbar.</Typography>;
  }

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const editBouquet = () => {
    setBouquetInfo({ id: bouquet.bouquetId, name: bouquet.name })
    setFlowers(bouquet.flowers);
    navigate("/")
  };

  const deleteBouquet = () => {
    axios
      .delete(`${api_base_url}bouquets/${bouquet.bouquetId}`, 
        { withCredentials: true })
      .then(_ => {
        handleClose();
        navigate("/profile")
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <>
      <Container sx={{ padding: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb" sx={{ background: "#fff3fe" }}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/profile")}>
              <Typography variant="h6" component="h1">
                Meine Bouquets
              </Typography>
            </Link>
            <Typography variant="h6" component="h1"> <strong>{bouquet.name}</strong></Typography>
          </Breadcrumbs>

          <div>
            <Button
              aria-label="delete"
              color="primary"
              onClick={editBouquet}
              sx={{ mr: "1rem", background: "#ffb6c1 !important" }}
            >
              <strong>Bouquet bearbeiten</strong>
            </Button>
            <Button
              aria-label="delete"
              sx={{ background: "#737dbc !important", color: "white !important" }}
              onClick={handleClickOpen}
            >
              <strong>Bouquet löschen</strong>
            </Button>
          </div>
        </Box>
        <Box>
          {bouquet.flowers && bouquet.flowers.length > 0 ? (
            bouquet.flowers.map((flower) => (
              <BouquetFlowerCard bouquetid={bouquet.bouquetId} flower={flower} key={flower.id} />
            ))
          ) : (
            <Typography variant="body1">Keine Blumen vorhanden.</Typography>
          )}
        </Box>
      </Container>
      <Dialog
        open={openDialog}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText>
            Damit löschst du dein Bouquet für immer. Bist du sicher?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button type="submit" sx={{ background: "#737dbc !important", color: "white !important" }} onClick={deleteBouquet}>Löschen</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BouquetDetail;
