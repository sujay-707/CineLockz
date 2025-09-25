import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaApple, FaGooglePlay } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 border-top border-3 border-white">
      <div className="container">
        <div className="row">
          
          {/* Left Section - Navigation Links */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li>
                <button className="btn btn-link text-light text-decoration-none p-0">Careers</button>
              </li>
              <li>
                <button className="btn btn-link text-light text-decoration-none p-0">Contact Us</button>
              </li>
              <li>
                <button className="btn btn-link text-light text-decoration-none p-0">FAQ</button>
              </li>
              <li>
                <button className="btn btn-link text-light text-decoration-none p-0">Terms & Conditions</button>
              </li>
            </ul>
          </div>

          {/* Center Section - Social Media Icons */}
          <div className="col-md-4 text-center">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center gap-3 mt-2">
              <button className="btn btn-link text-light fs-4 p-0"><FaFacebookF /></button>
              <button className="btn btn-link text-light fs-4 p-0"><FaInstagram /></button>
              <button className="btn btn-link text-light fs-4 p-0"><FaTwitter /></button>
              <button className="btn btn-link text-light fs-4 p-0"><FaYoutube /></button>
            </div>
          </div>

          {/* Right Section - Download App Links */}
          <div className="col-md-4 text-md-end text-center">
            <h5>Get The App</h5>
            <div className="d-flex justify-content-md-end justify-content-center gap-2 mt-2">
              <button className="btn btn-link text-light fs-4 p-0"><FaApple /> App Store</button>
              <button className="btn btn-link text-light fs-4 p-0"><FaGooglePlay /> Play Store</button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} CineLock All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
