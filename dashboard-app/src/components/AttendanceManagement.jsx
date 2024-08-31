import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/AttendanceManagement.css";
import Layout from "./Layout";
import { FaEye } from "react-icons/fa"; // Eye icon from react-icons

// Import your user icon image
import userIcon from "../assets/user-icon.png"; 

function AttendanceManagement() {
  const navigate = useNavigate();

  // State for the modal
  const [showModal, setShowModal] = useState(false);
  const [manualAttendance, setManualAttendance] = useState([]);
  const [formData, setFormData] = useState({
    staffId: "",
    number: "",
    user: "",
    checkInTime: "",
    checkOutTime: "",
    comment: "",
  });

  // Mock employee data with coordinates
  const employees = [
    {
      id: "E001",
      name: "John Doe",
      designation: "Software Engineer",
      status: "Active",
      present: "Yes",
      coordinates: [51.505, -0.09],
      checkInTime: "09:00",
      checkOutTime: "17:00",
    },
    {
      id: "E002",
      name: "Jane Smith",
      designation: "Product Manager",
      status: "Active",
      present: "Yes",
      coordinates: [51.515, -0.1],
      checkInTime: "09:15",
      checkOutTime: "17:15",
    },
    {
      id: "E003",
      name: "Alice Johnson",
      designation: "HR Specialist",
      status: "Inactive",
      present: "No",
      coordinates: [51.525, -0.08],
      checkInTime: "09:30",
      checkOutTime: "17:30",
    },
  ];

  const handleViewDetails = (employee) => {
    navigate("/employee-detail", { state: { employee } });
  };

  const handleAddAttendance = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setManualAttendance([...manualAttendance, formData]);
    setShowModal(false);
    setFormData({
      staffId: "",
      name: "",
      designation: "",
      status: "",
      present: "",
      checkInTime: "",
      checkOutTime: "",
      comment: "",
    });
  };

 
  const userMarkerIcon = L.icon({
    iconUrl: userIcon,
    iconSize: [32, 32], 
    iconAnchor: [16, 32],
    popupAnchor: [0, -32], 
  });

  return (
    <Layout>
      <div className="attendance-management">
        <div className="header">
          <h2>Attendance Management</h2>
        </div>
        <button className="add-attendance-btn" onClick={handleAddAttendance}>
          Add Attendance
        </button>
        {/* Modal for Adding Attendance */}
        {showModal && (
          <div className="modall">
            <div className="modall-content">
              <h3>
                Add Manual Attendance Here you can add attendance manually
              </h3>
              <div className="form-group">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Present</label>
                <input
                  type="text"
                  name="present"
                  value={formData.present}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Check-In Time</label>
                <input
                  type="time"
                  name="checkInTime"
                  value={formData.checkInTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Check-Out Time</label>
                <input
                  type="time"
                  name="checkOutTime"
                  value={formData.checkOutTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  maxLength="250"
                ></textarea>
              </div>
              <div className="modall-buttons">
                <button className="submit-btn" onClick={handleSubmit}>
                  Add
                </button>
                <button
                  className="closee-btn"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Map */}
        <div className="map-container">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            className="map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {employees.map((employee) => (
              <Marker
                key={employee.id}
                position={employee.coordinates}
                icon={userMarkerIcon} // Use the custom icon here
              >
                <Popup>
                  {employee.name} - {employee.status}
                  <br />
                  Check-In: {employee.checkInTime}
                  <br />
                  Check-Out: {employee.checkOutTime}
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
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th>Actions</th>
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
                  <td>{employee.checkInTime}</td>
                  <td>{employee.checkOutTime}</td>
                  <td>
                    <button onClick={() => handleViewDetails(employee)}>
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Manual Attendance Rows */}
              {manualAttendance.map((entry, index) => (
                <tr key={`manual-${index}`}>
                  <td>{entry.staffId}</td>
                  <td>{entry.user}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>Yes</td>
                  <td>{entry.checkInTime}</td>
                  <td>{entry.checkOutTime}</td>
                  <td>Manual</td>
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