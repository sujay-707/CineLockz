import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";
import MovieList from "./components/MovieList";
import SeatSimulatorPage from "./pages/SeatSimulatorPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Layout wrapper for Navbar and dark mode
function Layout({ darkMode, toggleDarkMode, children }) {
  return (
    <>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div
        className={`min-vh-100 p-3 ${
          darkMode ? "bg-dark text-white" : "bg-light text-dark"
        }`}
      >
        {children}
      </div>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      {loading ? (
        <SplashScreen />
      ) : (
        <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/seat-selection" element={<SeatSelectionPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/unlock-seat" element={<SeatSimulatorPage />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<Home darkMode={darkMode} />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

export default App;
