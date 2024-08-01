import React, { useContext } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../banner_logo.png";
import "../App.js";
import { AuthContext } from "../contexts/AuthContext.js";

function Header() {
  const { username } = useContext(AuthContext)

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={logo} alt="Flowwas Logo" className="logo" />
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        {!!username ? (
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
