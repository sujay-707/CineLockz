import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Sports from "./pages/Sports";
import Navbar from "./components/Navbar";
import Ticket from "./pages/Ticket";
import EventSportsPayment from "./pages/EventSportsPayment";
import MovieList from "./components/MovieList";
import SeatSimulatorPage from "./pages/SeatSimulatorPage";

// New pages for 2-step booking
import SeatSelectionPage from "./pages/SeatSelectionPage";
import Payment from "./pages/Payment";

import AdminDashboard from "./pages/Admin/AdminDashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Layout wrapper for Navbar and dark mode
function Layout({ user, handleSignOut, darkMode, toggleDarkMode, children }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];

  return (
    <>
      {user && !hideNavbarRoutes.includes(location.pathname) && (
        <Navbar
          isAuthenticated={!!user}
          onSignOut={handleSignOut}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
      )}
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
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      {loading ? (
        <SplashScreen />
      ) : (
        <Layout
          user={user}
          handleSignOut={handleSignOut}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                user ? (
                  <Home user={user} darkMode={darkMode} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/movies"
              element={
                user ? <MovieList user={user} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/seat-selection"
              element={user ? <SeatSelectionPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/payment"
              element={user ? <Payment /> : <Navigate to="/login" />}
            />
            <Route
              path="/ticket"
              element={user ? <Ticket /> : <Navigate to="/login" />}
            />
            <Route
              path="/events"
              element={user ? <Events /> : <Navigate to="/login" />}
            />
            <Route
              path="/sports"
              element={user ? <Sports /> : <Navigate to="/login" />}
            />
            <Route
              path="/eventsportspayment"
              element={user ? <EventSportsPayment /> : <Navigate to="/login" />}
            />
            <Route
              path="/unlock-seat"
              element={user ? <SeatSimulatorPage /> : <Navigate to="/login" />}
            />

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

export default App;
