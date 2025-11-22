import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Open Road Rentals</h3>
            <p>Your trusted partner for hill station adventures. We provide quality vehicles for a memorable journey.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="YouTube">YT</a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/booking">Book Now</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Our Locations</h3>
            <ul>
              <li>Shimla</li>
              <li>Manali</li>
              <li>Darjeeling</li>
              <li>Ooty</li>
              <li>Munnar</li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Info</h3>
            <ul>
              <li>Phone: +91 7651931926</li>
              <li>Email: datsnitin2006@gmail.com</li>
              <li>Address: Chitkara University, Punjab</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Open Road Rentals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;