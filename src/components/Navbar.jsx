import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>Online Kitapçı</h1>
        </Link>
        
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <FaHome className="nav-icon" />
              <span>Ana Sayfa</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              <FaShoppingCart className="nav-icon" />
              <span>Sepet</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/checkout" className="nav-link">
              <FaCreditCard className="nav-icon" />
              <span>Ödeme</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 