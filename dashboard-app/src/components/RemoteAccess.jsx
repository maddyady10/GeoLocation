import React, { useState } from 'react';
import '../styles/RemoteAccess.css'; // Optional: Create a CSS file for styling
import Layout from './Layout';

function RemoteAccess() {
  const [remoteLocations, setRemoteLocations] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [approvedEntries, setApprovedEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    remoteOfficeName: '',
    latitude: '',
    longitude: '',
    radius: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      // Edit existing entry
      const updatedLocations = remoteLocations.map((location, index) =>
        index === editIndex ? formData : location
      );
      setRemoteLocations(updatedLocations);
      setEditIndex(null);
    } else {
      // Add new entry
      setPendingApprovals([...pendingApprovals, formData]);
    }
    setFormData({
      remoteOfficeName: '',
      latitude: '',
      longitude: '',
      radius: '',
    });
    setIsModalOpen(false);
  };

  const handleApprove = (index) => {
    const approvedEntry = pendingApprovals[index];
    setApprovedEntries([...approvedEntries, approvedEntry]);
    const updatedPendingApprovals = pendingApprovals.filter((_, i) => i !== index);
    setPendingApprovals(updatedPendingApprovals);
  };

  const handleReject = (index) => {
    const updatedPendingApprovals = pendingApprovals.filter((_, i) => i !== index);
    setPendingApprovals(updatedPendingApprovals);
  };

  const handleEdit = (index) => {
    setFormData(pendingApprovals[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedApprovedEntries = approvedEntries.filter((_, i) => i !== index);
    setApprovedEntries(updatedApprovedEntries);
  };

  return (
    <Layout>
      <div className="remote-access">
        <h2>Remote Access</h2>
        <div className="button-container">
          <button className="manual-entry-btn" onClick={() => setIsModalOpen(true)}>Add Remote Office</button>
          <button className="manual-entry-btn" onClick={() => setIsViewModalOpen(true)}>View Remote Locations</button>
        </div>

        {/* Pending Approvals Section */}
        <div className="pending-approvals">
          <h3>Pending Approvals</h3>
          <table>
            <thead>
              <tr>
                <th>Requestor</th>
                <th>Location Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Radius</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map((entry, index) => (
                <tr key={index}>
                  <td>Example Requestor</td>
                  <td>{entry.remoteOfficeName}</td>
                  <td>{entry.latitude}</td>
                  <td>{entry.longitude}</td>
                  <td>{entry.radius}</td>
                  <td>
                    <div className="buttons-container2">
                      <button className="approve-btn" onClick={() => handleApprove(index)}>Approve</button>
                      <button className="reject-btn" onClick={() => handleReject(index)}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Approved Entries Section */}
        <div className="approved-entries">
          <h3>Approved Entries</h3>
          <table>
            <thead>
              <tr>
                <th>Office Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Radius (m)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.remoteOfficeName}</td>
                  <td>{entry.latitude}</td>
                  <td>{entry.longitude}</td>
                  <td>{entry.radius}</td>
                  <td>
                    <div className="buttons-container2">
                      <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Remote Add Modal */}
        <div className={`modal ${isModalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <h3>{editIndex !== null ? 'Edit Remote Office' : 'Add Remote Office'}</h3>
            <form>
              <label>
                Remote Office Name:
                <input
                  type="text"
                  name="remoteOfficeName"
                  value={formData.remoteOfficeName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Latitude:
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              </label>
              <label>
                Longitude:
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </label>
              <label>
                Radius (meters):
                <input
                  type="number"
                  name="radius"
                  value={formData.radius}
                  onChange={handleChange}
                />
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={handleSubmit}>
                  {editIndex !== null ? 'Save Changes' : 'Add'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>

        {/* View Remote Locations Modal */}
        <div className={`modal ${isViewModalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <h3>View Remote Locations</h3>
            {remoteLocations.length === 0 ? (
              <p>No remote locations added yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Office Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Radius (m)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {remoteLocations.map((location, index) => (
                    <tr key={index}>
                      <td>{location.remoteOfficeName}</td>
                      <td>{location.latitude}</td>
                      <td>{location.longitude}</td>
                      <td>{location.radius}</td>
                      <td>
                        <div className="buttons-container2">
                          <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="modal-buttons">
              <button type="button" onClick={() => setIsViewModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RemoteAccess;
