import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BouquetDetail from "./pages/BouquetDetail.js";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";
import { BouquetProvider } from "./contexts/BouquetContext.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BouquetProvider>
        <AuthProvider>
          <Router>
            <Header />
            <div className="body" style={{ minHeight: "90vH" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/bouquet/:bouquetId"
                  element={<BouquetDetail />}
                />
                <Route path="/login" element={<LoginForm destination={"profile"} />} />
                <Route path="/register" element={<RegisterForm />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </AuthProvider>
      </BouquetProvider>
    </ThemeProvider>
  );
}

export default App;
