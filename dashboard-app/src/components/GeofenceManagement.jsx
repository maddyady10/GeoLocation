// src/components/GeofenceManagement.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Layout from './Layout'; // Import the Layout component
import '../styles/GeofenceManagement.css';

function GeofenceManagement() {
  const geofences = [
    { id: 1, name: 'Office Location 1', position: [51.505, -0.09] },
    { id: 2, name: 'Office Location 2', position: [51.515, -0.1] },
    { id: 3, name: 'Office Location 3', position: [51.525, -0.11] },
  ];

  return (
    <Layout>
      <div className="geofence-management">
        <h2>Geofence Management</h2>
        <div className="map-container">
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geofences.map((geofence) => (
              <Marker key={geofence.id} position={geofence.position}>
                <Popup>{geofence.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="location-list">
          <h3>Location List</h3>
          <ul>
            {geofences.map((geofence) => (
              <li key={geofence.id}>{geofence.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default GeofenceManagement;
