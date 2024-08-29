import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Layout from './Layout';
import '../styles/GeofenceManagement.css';
import PropTypes from 'prop-types';

// Define custom icons
const userIcon = new L.Icon({
  iconUrl: 'https://img.icons8.com/ios-filled/50/000000/marker.png', // Pin icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const officeIcon = new L.Icon({
  iconUrl: 'https://img.icons8.com/ios-filled/50/000000/marker.png', // Pin icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function LocationMarker({ setLocation }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={userIcon} />
  );
}

LocationMarker.propTypes = {
  setLocation: PropTypes.func.isRequired,
};

function GeofenceManagement() {
  const [location, setLocation] = useState(null);
  const [officeLocations, setOfficeLocations] = useState([
    { lat: 51.505, lng: -0.09, name: 'London' },
    { lat: 48.8566, lng: 2.3522, name: 'Paris' },
    { lat: 40.7128, lng: -74.0060, name: 'New York' },
    { lat: 35.6895, lng: 139.6917, name: 'Tokyo' },
    { lat: -33.8688, lng: 151.2093, name: 'Sydney' }
  ]);

  const [form, setForm] = useState({ name: '', lat: '', lng: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLocation = {
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      name: form.name
    };
    setOfficeLocations((prevLocations) => [...prevLocations, newLocation]);
    setForm({ name: '', lat: '', lng: '' }); // Reset form
  };

  return (
    <Layout>
      <div className="geofence-management">
        <h2>Geofence Management</h2>
        <div className="map-container">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={2}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker setLocation={setLocation} />
            {officeLocations.map((loc, index) => (
              <Marker key={index} position={[loc.lat, loc.lng]} icon={officeIcon}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="location-details">
          {location && (
            <div>
              <h3>Selected Location Details</h3>
              <p>Latitude: {location.lat}</p>
              <p>Longitude: {location.lng}</p>
            </div>
          )}
        </div>
        <div className="form-container">
          <h3>Add New Office Location</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Office Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lat">Latitude:</label>
              <input
                type="number"
                id="lat"
                name="lat"
                step="0.0001"
                value={form.lat}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lng">Longitude:</label>
              <input
                type="number"
                id="lng"
                name="lng"
                step="0.0001"
                value={form.lng}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Add Office</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default GeofenceManagement;
