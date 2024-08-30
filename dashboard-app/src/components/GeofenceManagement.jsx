import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
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
    { lat: 51.505, lng: -0.09, name: 'London', radius: 200 },
    { lat: 48.8566, lng: 2.3522, name: 'Paris', radius: 200 },
    { lat: 40.7128, lng: -74.0060, name: 'New York', radius: 200 },
    { lat: 35.6895, lng: 139.6917, name: 'Tokyo', radius: 200 },
    { lat: -33.8688, lng: 151.2093, name: 'Sydney', radius: 200 }
  ]);

  const [form, setForm] = useState({ name: '', lat: '', lng: '', radius: '' });
  const [editIndex, setEditIndex] = useState(null);

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
      name: form.name,
      radius: form.radius ? parseFloat(form.radius) : 200 // Default radius is 200m
    };

    if (editIndex !== null) {
      // Update existing location
      setOfficeLocations((prevLocations) => {
        const updatedLocations = [...prevLocations];
        updatedLocations[editIndex] = newLocation;
        return updatedLocations;
      });
      setEditIndex(null); // Reset edit index
    } else {
      // Add new location
      setOfficeLocations((prevLocations) => [...prevLocations, newLocation]);
    }
    setForm({ name: '', lat: '', lng: '', radius: '' }); // Reset form
  };

  const handleEdit = (index) => {
    const location = officeLocations[index];
    setForm({
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      radius: location.radius
    });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setOfficeLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };

  return (
    <Layout>
      <div className="geofence-management">
        <h2>Geofence Management</h2>

        <div className="form-container">
          <h3>{editIndex !== null ? 'Edit Office Location' : 'Add New Office Location'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
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
            </div>
            <div className="form-row">
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
              <div className="form-group">
                <label htmlFor="radius">Radius (meters):</label>
                <input
                  type="number"
                  id="radius"
                  name="radius"
                  step="1"
                  value={form.radius}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit">{editIndex !== null ? 'Update Office' : 'Add Office'}</button>
          </form>
        </div>

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
              <React.Fragment key={index}>
                <Marker position={[loc.lat, loc.lng]} icon={officeIcon}>
                  <Popup>{loc.name}</Popup>
                </Marker>
                <Circle
                  center={[loc.lat, loc.lng]}
                  radius={loc.radius}
                  pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
                />
              </React.Fragment>
            ))}
          </MapContainer>
        </div>

        <div className="table-container">
          <h3>Office Locations</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Radius (m)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {officeLocations.map((loc, index) => (
                <tr key={index}>
                  <td>{loc.name}</td>
                  <td>{loc.lat}</td>
                  <td>{loc.lng}</td>
                  <td>{loc.radius}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default GeofenceManagement;
