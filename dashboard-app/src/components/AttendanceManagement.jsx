// src/components/AttendanceManagement.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/AttendanceManagement.css';
import Layout from './Layout';

function AttendanceManagement() {
  // Updated data with coordinates
  const employees = [
    { id: 'E001', name: 'John Doe', designation: 'Software Engineer', status: 'Active', present: 'Yes', coordinates: [51.505, -0.09] },
    { id: 'E002', name: 'Jane Smith', designation: 'Product Manager', status: 'Active', present: 'Yes', coordinates: [51.515, -0.1] },
    { id: 'E003', name: 'Alice Johnson', designation: 'HR Specialist', status: 'Inactive', present: 'No', coordinates: [51.525, -0.08] },
  ];

  return (
    <Layout>
    <div className="attendance-management">
      {/* Interactive Map */}
      <div className="map-container">
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {employees.map((employee) => (
            <Marker key={employee.id} position={employee.coordinates}>
              <Popup>
                {employee.name} - {employee.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Employee Table */}
      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.status}</td>
                <td>{employee.present}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
}

export default AttendanceManagement;
