import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DeviceManagement.css';
import Layout from './Layout';

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:5000';

function DeviceManagement() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ name: '', type: '', lastLogin: '', status: '' });

  useEffect(() => {
    axios.get('/api/devices')
      .then(response => setDevices(response.data))
      .catch(error => console.error('Error fetching devices:', error));
  }, []);

  const handleAddDevice = () => {
    axios.post('/api/devices', newDevice)
      .then(response => setDevices([...devices, response.data]))
      .catch(error => console.error('Error adding device:', error));
  };

  const handleDeleteDevice = (id) => {
    axios.delete(`/api/devices/${id}`)
      .then(() => setDevices(devices.filter(device => device._id !== id)))
      .catch(error => console.error('Error deleting device:', error));
  };

  const handleUpdateDevice = (id, updatedDevice) => {
    axios.put(`/api/devices/${id}`, updatedDevice)
      .then(response => {
        console.log('Device updated:', response.data);
        setDevices(devices.map(device => device._id === id ? response.data : device));
      })
      .catch(error => {
        console.error('Error updating device:', error);
        alert('Failed to update device. Check console for details.');
      });
  };
  

  return (
    <Layout>
      <div className="device-management">
        <h2>Device Management</h2>
        <div className="device-list">
          <h3>Device List</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Last Login</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device._id}>
                  <td>{device._id}</td>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  <td>{device.lastLogin}</td>
                  <td>{device.status}</td>
                  <td>
                    <button onClick={() => handleUpdateDevice(device._id, { ...device, status: 'UpdatedStatus' })}>Edit</button>
                    <button onClick={() => handleDeleteDevice(device._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Add New Device</h3>
          <input type="text" placeholder="Name" onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })} />
          <input type="text" placeholder="Type" onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })} />
          <input type="text" placeholder="Last Login" onChange={(e) => setNewDevice({ ...newDevice, lastLogin: e.target.value })} />
          <input type="text" placeholder="Status" onChange={(e) => setNewDevice({ ...newDevice, status: e.target.value })} />
          <button onClick={handleAddDevice}>Add Device</button>
        </div>
      </div>
    </Layout>
  );
}

export default DeviceManagement;
