import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaSun, FaMoon, FaChair, FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Seat Simulator", path: "/unlock-seat", icon: <FaChair className="me-1" /> },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm py-2 position-relative"
      style={{ background: "linear-gradient(90deg, #e3e2f0ff, #779faeff, #24243e)" }}
    >
      {/* Overlay */}
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
        className="container position-relative d-flex align-items-center justify-content-between flex-wrap"
        style={{ zIndex: 2 }}
      >
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-white" to="/" style={{ maxWidth: "160px" }}>
          <img src="/assets/logo.png" alt="CineLock" style={{ width: "100%", height: "auto" }} />
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler border-0 text-white mt-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        {/* Navbar Links + Search */}
        <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center text-center">
            {links.map((link) => (
              <li className="nav-item my-1 my-lg-0" key={link.name}>
                <Link
                  className="nav-link text-white fw-bold d-flex align-items-center justify-content-center px-3"
                  to={link.path}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Bar */}
          <div className="d-none d-lg-block ms-3">
            <div className="position-relative">
              <FaSearch
                className="position-absolute text-secondary"
                style={{ left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}
              />
              <input
                type="text"
                placeholder="Search movies..."
                className="form-control ps-5 pe-3 shadow-sm"
                style={{
                  borderRadius: "25px",
                  height: "40px",
                  fontSize: "14px",
                  border: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                  color: "#000",
                  minWidth: "180px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Dark Mode Button */}
        <div className="d-flex align-items-center ms-3 mt-2 mt-lg-0">
          <button
            className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px", transition: "0.3s" }}
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun className="text-warning" /> : <FaMoon className="text-white" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
