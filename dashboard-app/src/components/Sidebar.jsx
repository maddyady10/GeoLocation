// src/components/Sidebar.jsx
import React from 'react';
import '../styles/Sidebar.css'; // Ensure this file exists for styling

function Sidebar() {
  return (
    <aside className="sidebar">
        <br></br>
        <br></br>
      <h3>Sidebar</h3>
      <ul className="sidebar-links">
        <li><a href="/overview">Dashboard Overview</a></li>
        <li><a href="/geofence-management">Geofence Management</a></li>
        <li><a href="/employee-management">Employee Management</a></li>
        <li><a href="/device-management">Device Management</a></li>
        <li><a href="/attendance-management">Attendance Management</a></li>
        <li><a href="/remote-access">Remote Access</a></li>
      </ul> 
    </aside>
  );
}

export default Sidebar;