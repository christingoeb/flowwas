import React, { useContext } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../banner_logo.png";
import "../App.js";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

function Header() {
  const { username, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post("http://localhost:3002/logout", {
        withCredentials: true,
      })
      .then(() => {
        setUsername("");
        navigate(`/`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const goHome = () => {
    navigate(`/`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img onClick={goHome} src={logo} alt="Flowwas Logo" className="logo" />
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        {!!username ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to={"/profile"}
            >
              Profil
            </Button>
            <Button color="inherit" component={Link} onClick={logout}>
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
