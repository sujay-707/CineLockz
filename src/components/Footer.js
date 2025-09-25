
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaApple, FaGooglePlay } from "react-icons/fa";

export default function Footer() {
  // Helper function to disable links
  const disableLink = (e) => e.preventDefault();

  return (
    <footer className="bg-dark text-light py-4 border-top border-3 border-white">
      <div className="container">
        <div className="row">
          
          {/* Left Section - Navigation Links */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" onClick={disableLink} className="text-light text-decoration-none">Careers</a></li>
              <li><a href="#" onClick={disableLink} className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="#" onClick={disableLink} className="text-light text-decoration-none">FAQ</a></li>
              <li><a href="#" onClick={disableLink} className="text-light text-decoration-none">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Center Section - Social Media Icons */}
          <div className="col-md-4 text-center">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center gap-3 mt-2">
              <a href="#" onClick={disableLink} className="text-light fs-4"><FaFacebookF /></a>
              <a href="#" onClick={disableLink} className="text-light fs-4"><FaInstagram /></a>
              <a href="#" onClick={disableLink} className="text-light fs-4"><FaTwitter /></a>
              <a href="#" onClick={disableLink} className="text-light fs-4"><FaYoutube /></a>
            </div>
          </div>

          {/* Right Section - Download App Links */}
          <div className="col-md-4 text-md-end text-center">
            <h5>Get The App</h5>
            <div className="d-flex justify-content-md-end justify-content-center gap-2 mt-2">
              <a href="#" onClick={disableLink} className="text-light fs-4"><FaApple /> App Store</a>
              <a href="#" onClick={disableLink} className="text-light fs-4"><FaGooglePlay /> Play Store</a>
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
