import React, { useState, useRef } from 'react';
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

function LocationMarker({ setLocation, onLocationClick }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const latLng = e.latlng;
      setPosition(latLng);
      setLocation(latLng);
      if (onLocationClick) {
        onLocationClick(latLng); // Call the onLocationClick callback with the latitude and longitude
      }
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={userIcon} />
  );
}

LocationMarker.propTypes = {
  setLocation: PropTypes.func.isRequired,
  onLocationClick: PropTypes.func, // Optional prop
};

function GeofenceManagement() {
  const [location, setLocation] = useState(null);
  const [officeLocations, setOfficeLocations] = useState([
    { lat: 28.6139, lng: 77.2090, name: 'Delhi', radius: 200 },
  { lat: 19.0760, lng: 72.8777, name: 'Mumbai', radius: 200 },
  { lat: 13.0827, lng: 80.2707, name: 'Chennai', radius: 200 },
  { lat: 12.9716, lng: 77.5946, name: 'Bengaluru', radius: 200 },
  { lat: 22.5726, lng: 88.3639, name: 'Kolkata', radius: 200 }
  ]);

  const [form, setForm] = useState({ name: '', lat: '', lng: '', radius: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [mapCoordinates, setMapCoordinates] = useState({ lat: '', lng: '' });

  const formRef = useRef(null); // Reference to the form container

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
    window.scrollTo({
      top: formRef.current.offsetTop - 50, // Adjust this value as needed
      behavior: 'smooth'
    });
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
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    setOfficeLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };

  const handleMapClick = (latLng) => {
    setMapCoordinates({ lat: latLng.lat.toFixed(4), lng: latLng.lng.toFixed(4) });
  };

  return (
    <Layout>
      <div className="geofence-management">
        <h2>Geofence Management</h2>

        <div className="form-container" ref={formRef}>
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
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker setLocation={setLocation} onLocationClick={handleMapClick} />
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

        <div className="coordinates-display">
          {mapCoordinates.lat && mapCoordinates.lng && (
            <p>Clicked Location: Latitude {mapCoordinates.lat}, Longitude {mapCoordinates.lng}</p>
          )}
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
                  <div className="buttons-container2">
                    <button className="approve-btn" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="reject-btn" onClick={() => handleDelete(index)}>Delete</button></div>
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
