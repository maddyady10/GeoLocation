import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeForm.css";
import Layout from "./Layout";
import axios from "axios";

function EmployeeForm() {
  const [form, setForm] = useState({
    staffId: "",
    fullName: "",
    email: "",
    gender: "",
    phone: "",
    OfficeId: "",
    designation: "",
    photo: null,
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // State to track the action button state for each location
  const [locationActions, setLocationActions] = useState([
    { id: 1, name: "Office location 2", lat: "33.670015952204", lng: "73.00055932031", radius: 50, action: "REMOVE" },
    { id: 2, name: "Main Branch", lat: "33.6680564026", lng: "72.973488165703", radius: 100, action: "REMOVE" },
  ]);

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.gender || !form.designation) {
      alert("Please fill all required fields.");
      return;
    }

    console.log("the form", form);
    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const response = await axios.post("http://localhost:4000/api/web/employeeDetails", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      navigate("/employee-management"); // Navigate back to employee management page
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const toggleAction = (id) => {
    setLocationActions((prevActions) =>
      prevActions.map((location) =>
        location.id === id ? { ...location, action: location.action === "REMOVE" ? "ADD" : "REMOVE" } : location
      )
    );
  };

  const Popup = ({ onClose }) => (
    <div className="popup">
      <div className="popup-content">
        <h3>Add/Remove Attendance Locations</h3>
        <p>Here You can add or remove the user from any attendance location</p>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Radius</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {locationActions.map((location) => (
              <tr key={location.id}>
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.lat}</td>
                <td>{location.lng}</td>
                <td>{location.radius}</td>
                <td>
                  <button className="remove-button" onClick={() => toggleAction(location.id)}>
                    {location.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose} style={{backgroundColor: '#f44336',color: '#ffffff',padding: '10px 20px',border: 'none',borderRadius: '4px',cursor: 'pointer',}} className="cloose-popup-button">Close</button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="employee-form">
        <h3>Add Employee</h3>
        <p>Update following Employee Information</p>
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Staff ID:</label>
              <input
                type="text"
                name="staffId"
                value={form.staffId}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleFormChange}
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Designation:</label>
              <select
                name="designation"
                value={form.designation}
                onChange={handleFormChange}
                required
              >
                <option value="" disabled>Select designation</option>
                <option value="Assistant">Assistant</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Upload Photo:</label>
              <input type="file" name="photo" onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label>Office ID:</label>
              <button type="button" onClick={() => setIsPopupOpen(true)}>CLICK ME</button>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="update-button">
              Add Employee
            </button>
            <button
              type="button"
              className="close-button"
              onClick={() => navigate("/employee-management")}
            >
              Close
            </button>
          </div>
        </form>
        {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
      </div>
    </Layout>
  );
}

export default EmployeeForm;
