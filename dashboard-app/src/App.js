// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Dashboard from './components/Dashboard';
import Dashboard2 from './components/Dashboard2';
import GeofenceManagement from './components/GeofenceManagement';
import EmployeeManagement from './components/EmployeeManagement';
import DeviceManagement from './components/DeviceManagement';
import RemoteAccess from './components/RemoteAccess';
import RemoteOffice from './components/RemoteOffice';
import Login from './components/Login';
import Signup from './components/Signup';
import AttendanceManagement from './components/AttendanceManagement';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeForm from './components/EmployeeForm';


function App() {
  return (
    
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/2" element={<Dashboard2 />} />
        <Route path="/geofence-management" element={<GeofenceManagement />} />
        <Route path="/overview" element={<Dashboard />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/device-management" element={<DeviceManagement />} />
        <Route path="/remote-access" element={<RemoteAccess />} />
        <Route path="/remote-office" element={RemoteOffice} />
        <Route path="/login" component={Login} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/empform" element={<EmployeeForm />} />
        
         <Route path="/attendance-management" element={<AttendanceManagement />} /> {/* Ensure the component is passed here */}
         <Route path="/employee-detail" element={<EmployeeDetail />} />{/* Add other routes here */}
      </Routes>
    </Router>
    
  );
}
export default App;
