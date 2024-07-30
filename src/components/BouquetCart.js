import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import "../App.css";

function BouquetCart({
  cart,
  removeFromCart,
  collectionName,
  setCollectionName,
  saveFlowerCollection,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <IconButton className="floating-cart-button" onClick={toggleDrawer}>
        <ShoppingCartIcon />
      </IconButton>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        <div className="floating-cart-content">
          <IconButton onClick={toggleDrawer} className="close-button">
            <CloseIcon />
          </IconButton>
          <h2>Einkaufswagen</h2>
          {cart.length === 0 ? (
            <p>Der Einkaufswagen ist leer</p>
          ) : (
            <List>
              {cart.map((flower) => (
                <ListItem key={flower.id}>
                  <ListItemText primary={flower.name} />
                  <Button onClick={() => removeFromCart(flower.id)}>x</Button>
                </ListItem>
              ))}
            </List>
          )}
          <TextField
            label="Sammlungsname"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={saveFlowerCollection}
          >
            Sammlung speichern
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default BouquetCart;
