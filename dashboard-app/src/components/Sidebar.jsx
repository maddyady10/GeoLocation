import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/Sidebar.css'; // Make sure to import the CSS file

const Sidebar = () => {
  const springProps = useSpring({
    to: { transform: 'translateX(0)', opacity: 1 },
    from: { transform: 'translateX(-20px)', opacity: 0 },
    config: { duration: 300 }
  });

  return (
    <animated.aside className="sidebar" style={springProps}>
      <div className="sidebar-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3 6H21V8H3V6ZM3 12H21V14H3V12ZM3 18H21V20H3V18Z" fill="#00bcd4"/>
        </svg>
        <h1>Dashboard</h1>
      </div>
      <ul className="sidebar-links">
        <li><a href="/overview">Dashboard Overview</a></li>
        <li><a href="/geofence-management">Geofence Management</a></li>
        <li><a href="/employee-management">Employee Management</a></li>
        <li><a href="/device-management">Device Management</a></li>
        <li><a href="/attendance-management">Attendance Management</a></li>
        <li><a href="/remote-access">Remote Access</a></li>
      </ul>
    </animated.aside>
  );
};

export default Sidebar;
