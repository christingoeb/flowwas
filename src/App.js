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
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allFlowers")
      .then((res) => {
        setData(res.data);
        console.log("Fetched data:", res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/flower/:flowerId" element={<FlowerDetail />} />
      </Routes>
    </Router>
  );
  /*es fehlt am ende ein <Footer /> */
}

export default App;
