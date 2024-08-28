// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import GeofenceManagement from './components/GeofenceManagement';
import EmployeeManagement from './components/EmployeeManagement';
import DeviceManagement from './components/DeviceManagement';
import RemoteAccess from './components/RemoteAccess';
import Login from './components/Login';

function App() {
  return (
    
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/geofence-management" element={<GeofenceManagement />} />
        <Route path="/overview" element={<Dashboard />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/device-management" element={<DeviceManagement />} />
        <Route path="/remote-access" element={<RemoteAccess />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
    
  );
}
export default App;
