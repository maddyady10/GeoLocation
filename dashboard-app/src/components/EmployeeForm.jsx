import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeForm.css";
import Layout from "./Layout";

function EmployeeForm({ addEmployee }) {
  const [form, setForm] = useState({
    staffId: "",
    fullName: "",
    email: "",
    gender: "",
    phone: "",
    department: "",
    designation: "",
    documents: null,
    photo: null,
  });

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addEmployee(form);
    navigate("/employeeManagement"); // Navigate back to employee management page
  };

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
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Designation:</label>
              <select
                name="designation"
                value={form.designation}
                onChange={handleFormChange}
                required
              >
                <option value="Assistant">Assistant</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </select>
            </div>
            <div className="form-group">
            <label>Upload Photo:</label>
            <input type="file" name="photo" onChange={handleFileChange} />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="update-button">
              Add Employee
            </button>
            <button
              type="button"
              className="close-button"
              onClick={() => navigate("/employeeManagement")}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EmployeeForm;