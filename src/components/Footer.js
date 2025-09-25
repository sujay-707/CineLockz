import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaApple, FaGooglePlay } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 border-top border-3 border-white">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Left Section */}
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li><button className="btn btn-link text-light p-0 text-decoration-none">Careers</button></li>
              <li><button className="btn btn-link text-light p-0 text-decoration-none">Contact Us</button></li>
              <li><button className="btn btn-link text-light p-0 text-decoration-none">FAQ</button></li>
              <li><button className="btn btn-link text-light p-0 text-decoration-none">Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Center Section */}
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center gap-3 mt-2 flex-wrap">
              <FaFacebookF size={20} />
              <FaInstagram size={20} />
              <FaTwitter size={20} />
              <FaYoutube size={20} />
            </div>
          </div>

          {/* Right Section */}
          <div className="col-12 col-md-4">
            <h5>Get The App</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-2 mt-2 flex-wrap">
              <button className="btn btn-outline-light btn-sm rounded-pill d-flex align-items-center gap-1">
                <FaApple /> App Store
              </button>
              <button className="btn btn-outline-light btn-sm rounded-pill d-flex align-items-center gap-1">
                <FaGooglePlay /> Play Store
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} CineLock. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
