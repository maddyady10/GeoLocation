// src/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/Layout.css'; // Ensure this CSS file is correctly referenced

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
