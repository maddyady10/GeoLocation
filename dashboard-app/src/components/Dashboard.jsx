// src/components/Dashboard.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/Dashboard.css'; // You can create this CSS file for styling

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          
          <br></br><br></br>
          <h1>Welcome to the Dashboard</h1>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
