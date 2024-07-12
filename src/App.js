import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FlowerDetail from "./pages/FlowerDetail";
import "./App.css";

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
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home flowerData={flower} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/flower/:flowerId" element={<FlowerDetail />} />
        </Routes>
      </Router>
    );
    /*es fehlt am ende ein <Footer /> */
  }
}

export default App;
