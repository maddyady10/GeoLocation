// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Dashboard from './components/Dashboard';
import GeofenceManagement from './components/GeofenceManagement';
import EmployeeManagement from './components/EmployeeManagement';
import DeviceManagement from './components/DeviceManagement';
import RemoteAccess from './components/RemoteAccess';
import Login from './components/Login';
import Signup from './components/Signup';
import AttendanceManagement from './components/AttendanceManagement';
import EmployeeDetail from './components/EmployeeDetail';


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
        <Route path="/login" component={Login} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/attendance-management" element={<AttendanceManagement />} /> {/* Ensure the component is passed here */}
         <Route path="/employee-detail" element={<EmployeeDetail />} />{/* Add other routes here */}
      </Routes>
    </Router>
    
  );
}
export default App;
