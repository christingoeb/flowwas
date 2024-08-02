import React, { useContext, useState } from "react";
import {
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Button,
    IconButton,
    Stack,
    Dialog,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions
} from '@mui/material';
import { BouquetContext } from "../contexts/CreateBouquetContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { api_base_url } from '../settings.json';
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import LoginForm from "./LoginForm";

function BouquetBasket() {
    const { flowers, removeItem, clearList } = useContext(BouquetContext);
    const { username } = useContext(AuthContext);
    const [open, setOpen] = useState(flowers.length);
    const [openDialog, setOpenDialog] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    function createBouquet(name) {
        const requestBody = {
            name,
            flowerIds: flowers.map(flower => flower.id)
        }

        axios.post(`${api_base_url}bouquets`, requestBody, {
            withCredentials: true,
        }).then(response => {
            clearList();
            handleClose();
        }).catch(e => {
            console.error(e)
        })
    }

    return (<>
        <Drawer
            variant="permanent"
            anchor="right"
            open={!!flowers.length}
            onClose={toggleDrawer(false)}
            sx={{
                width: 550,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 550, boxSizing: 'border-box' },
            }}
        >
            {username ?
                <Box sx={{ overflow: 'auto' }} onClick={toggleDrawer(false)}>
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100vH" }}
                        spacing={1}
                    >
                        <div>
                            <Typography variant="h5" component="h1" gutterBottom sx={{ pl: "1.5rem", mt: "2.25rem", mb: "2.25rem" }}>
                                <strong>Dein neuer Blumenstrauß</strong>
                            </Typography>
                            <Divider sx={{ mx: "1rem" }} />
                            <List>
                                {flowers.map((flower, index) => (
                                    <ListItem key={index} disablePadding onClick={toggleDrawer(false)} >
                                        <ListItemButton>
                                            <img
                                                style={{ width: '50px', height: '50px', borderRadius: "10px", marginRight: "1rem" }}
                                                src={`${process.env.PUBLIC_URL}/flower_images/` + flower.image}
                                                alt={flower.name} />

                                            <ListItemText primary={flower.name} />
                                            <div style={{ background: flower.color, width: 15, height: 15, borderRadius: "50%", marginRight: "1rem", border: "1px black solid" }}></div>

                                            <IconButton aria-label="delete" onClick={() => removeItem(flower.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                            <Divider sx={{ mx: "1rem", mb: "1rem" }} />
                            <div style={{ paddingLeft: "1.5rem", paddingRight: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography variant="body"><strong>{flowers.length} / 11 Blumen</strong></Typography>
                                <Button onClick={handleClickOpen}>Speichern</Button>
                            </div>
                        </div>
                    </Stack>
                </Box>
                : <LoginForm />
            }
        </Drawer>
        <Dialog
            open={openDialog}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const name = formJson.name;
                    console.log(name);
                    createBouquet(name)
                    handleClose();
                },
            }}
        >
            <DialogContent>
                <DialogContentText>
                    Bitte gib deinem Blumenstrauß noch einen Namen, damit du ihn später wiedererkennen kannst.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button type="submit">Erstellen</Button>
            </DialogActions>
        </Dialog>
    </>
    )
}

export default BouquetBasket;