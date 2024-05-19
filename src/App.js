import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Home';
import FlowerDetail from './pages/FlowerDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/flower/:flowerId" element={<FlowerDetail />} />
      </Routes>
    </Router>
  );
  /*es fehlt am ende ein <Footer /> */
}

export default App;
