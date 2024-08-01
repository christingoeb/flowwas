import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FlowerDetail from "./pages/FlowerDetail";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";
import { BouquetProvider } from './contexts/CreateBouquetContext.js';
import { AuthProvider } from "./contexts/AuthContext.js";

function App() {
  const [flower, setFlower] = useState(null); // flower type is object

  useEffect(() => {
    axios
      .get("http://localhost:3002/allFlowers")
      .then((res) => {
        setFlower(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!flower) {
    return <div>Loading...</div>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <BouquetProvider>
          <AuthProvider>
            <Router>
              <Header />
              <div className="body">
                <Routes>
                  <Route path="/" element={<Home flowerData={flower} />} />
                  <Route path="/profile/:userName" element={<Profile />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/flower/:flowerId" element={<FlowerDetail />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                </Routes>
              </div>
            </Router>
          </AuthProvider>
        </BouquetProvider>
      </ThemeProvider>
    );
  }
}

export default App;
