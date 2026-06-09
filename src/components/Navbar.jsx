import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ isAuthor }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">Bayawaza!</Link>
        
        <div className="navbar__links">
          <Link to="/" className={`navbar__link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/opinions" className={`navbar__link ${isActive('/opinions') ? 'active' : ''}`}>
            Opinions
          </Link>
          <Link to="/journal" className={`navbar__link ${isActive('/journal') ? 'active' : ''}`}>
            Journal
          </Link>
          
          {isAuthor && (
            <Link to="/create" className={`navbar__link ${isActive('/create') ? 'active' : ''}`}>
              Create Post
            </Link>
          )}

          <Link to="/about" className={`navbar__link ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>
          
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-container" 
            aria-label="Switch Theme"
          >
            <i className={`fa-solid fa-sun toggle-icon ${theme === 'light' ? 'active-sun' : ''}`}></i>
            <i className={`fa-solid fa-moon toggle-icon ${theme === 'dark' ? 'active-moon' : ''}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}