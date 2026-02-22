import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          Open <span>Road</span> Rentals
        </Link>
        
        <div 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {currentUser && (
            <li><span className="welcome-user">Welcome {currentUser.name}!</span></li>
          )}
          {!currentUser && (
            <>
              {location.pathname !== '/signup' && <li><Link to="/signup">Sign Up</Link></li>}
              {location.pathname !== '/login' && <li><Link to="/login">Login</Link></li>}
            </>
          )}
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          {currentUser && (
            <li style={{marginLeft: 'auto'}}><button onClick={handleLogout} className="logout-btn">Log Out</button></li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;