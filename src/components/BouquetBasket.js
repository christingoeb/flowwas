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
    DialogActions,
    Skeleton
} from '@mui/material';
import { BouquetContext } from "../contexts/BouquetContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { api_base_url } from '../settings.json';
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

function BouquetBasket() {
    const { flowers, removeItem, clearList, bouquetInfo } = useContext(BouquetContext);
    const { username } = useContext(AuthContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleImageLoad = () => {
        setLoading(false);
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const cancelEditing = () => {
        clearList();
        navigate("/profile")
    };

    function updateBouquet() {
        const requestBody = {
            bouquetId: bouquetInfo.id,
            flowerIds: flowers.map(flower => flower.id)
        }

        axios.put(`${api_base_url}bouquets`, requestBody, {
            withCredentials: true,
        }).then(_ => {
            clearList();
            navigate("/profile")
        }).catch(e => {
            console.error(e)
        })
    }

    function createBouquet(name) {
        const requestBody = {
            name,
            flowerIds: flowers.map(flower => flower.id)
        }

        axios.post(`${api_base_url}bouquets`, requestBody, {
            withCredentials: true,
        }).then(_ => {
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
            sx={{
                width: 550,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 550, boxSizing: 'border-box' },
            }}
        >
            {username ?
                <Box sx={{ overflow: 'auto' }}>
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100vH" }}
                        spacing={1}
                    >
                        <div>
                            <Typography variant="h5" component="h1" gutterBottom sx={{ pl: "1.5rem", mt: "2.25rem", mb: "2.25rem" }}>
                                <strong>{bouquetInfo?.name ? bouquetInfo?.name : "Dein neuer Blumenstrauß"}</strong>
                            </Typography>
                            <Divider sx={{ mx: "1rem" }} />
                            <List>
                                {flowers.map((flower, index) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton>
                                            { loading && <Skeleton variant="rounded" width={50} height={50} /> }
                                            <img
                                                style={{ width: '50px', height: '50px', borderRadius: "10px", marginRight: "1rem", display: loading ? 'none' : 'block' }}
                                                src={`${api_base_url}image/${flower.id}`}
                                                onLoad={handleImageLoad}
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
                                <div>
                                    <Button onClick={cancelEditing} sx={{ mr: "1rem", display: bouquetInfo.name ? "inline-block" : "none" }}>Abbrechen</Button>
                                    { bouquetInfo.name ?
                                        <Button onClick={updateBouquet} sx={{ background: "#ffb6c1 !important" }} disabled={flowers.length === 0}>Aktualisieren</Button>
                                        : <Button onClick={handleClickOpen} sx={{ background: "#ffb6c1 !important" }} disabled={flowers.length === 0}>Speichern</Button>
                                    }
                                </div>
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
                    createBouquet(name);
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
                    defaultValue={bouquetInfo?.name ? bouquetInfo?.name : ""}
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