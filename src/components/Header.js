import React from "react";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../banner_logo.png";
import "../App.js";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Prüfe, ob der Benutzer eingeloggt ist
    const userId = localStorage.getItem("userId");
    console.log(`user id ist die: ${userId}`);
    setIsLoggedIn(!!userId); // Wenn userId vorhanden, ist der Benutzer eingeloggt
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={logo} alt="Flowwas Logo" className="logo" />
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        {isLoggedIn ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to={`/profile/${localStorage.getItem("userId")}`}
            >
              Profil
            </Button>
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
