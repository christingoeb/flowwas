import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:3002/logout");
        // Clear user data from localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
    handleLogout();
  }, []);

  return <div>Logging out...</div>;
}

export default Logout;
