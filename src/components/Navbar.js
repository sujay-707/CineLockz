import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaSun, FaMoon, FaChair } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = ({ isAuthenticated, onSignOut, toggleDarkMode, darkMode }) => {
  const user = isAuthenticated
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Define links based on user type
  const userLinks = [
    { name: "Movies", path: "/movies" },
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Seat Simulator", path: "/unlock-seat", icon: <FaChair className="me-1" /> },
    { name: "About Us", path: "/about" },
  ];

  const adminLinks = [
    { name: "Stats", path: "/admin#stats" },
    { name: "Users", path: "/admin#users" },
    { name: "Movies", path: "/admin#movies" },
    { name: "Tickets", path: "/admin#tickets" },
  ];

  const linksToRender = user?.isAdmin ? adminLinks : userLinks;

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm py-2 position-relative"
      style={{
        background: "linear-gradient(90deg, #e3e2f0ff, #779faeff, #24243e)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      ></div>

      <div
        className="container position-relative d-flex align-items-center justify-content-between"
        style={{ zIndex: 2 }}
      >
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-white" to="/">
          <img src="/assets/logo.png" alt="CineLock" style={{ width: "160px" }} />
        </Link>

        {/* Search Bar */}
        {!user?.isAdmin && (
          <div className="flex-grow-1 mx-3 d-none d-lg-block">
            <div className="position-relative w-100">
              <FaSearch
                className="position-absolute text-secondary"
                style={{
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                }}
              />
              <input
                type="text"
                placeholder="Search movies..."
                className="form-control ps-5 pe-3 shadow-sm"
                style={{
                  borderRadius: "25px",
                  height: "45px",
                  fontSize: "15px",
                  border: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                  color: "#000",
                }}
              />
            </div>
          </div>
        )}

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {linksToRender.map((link) => (
              <li className="nav-item" key={link.name}>
                <Link
                  className="nav-link text-white fw-bold d-flex align-items-center px-3"
                  to={link.path}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Dark Mode + Auth */}
        <div className="d-flex align-items-center ms-3">
          <button
            className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ width: "40px", height: "40px", transition: "0.3s" }}
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun className="text-warning" /> : <FaMoon className="text-white" />}
          </button>

          {isAuthenticated && user && (
            <span className="text-white fw-bold me-3 d-none d-lg-block">
              Welcome {user.isAdmin ? "Admin" : user.name}
            </span>
          )}

          {isAuthenticated ? (
            <button className="btn btn-danger px-3 fw-bold" onClick={onSignOut}>
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary px-3 fw-bold">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
