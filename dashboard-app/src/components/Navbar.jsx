// src/components/Navbar.jsx
import React from 'react';
import '../styles/Navbar.css'; // You can create this CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">My Dashboard</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#settings">Settings</a></li>
        <li><a href="/login">LOGIN</a></li>
        <li><a href="/signup">SIGNUP</a></li>
        <li><a href="#login">     </a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
