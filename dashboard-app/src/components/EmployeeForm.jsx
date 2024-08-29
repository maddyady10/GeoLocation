import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeForm.css';
import Layout from './Layout';

function EmployeeForm({ addEmployee }) {
  const [form, setForm] = useState({
    id: '',
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    department: '',
    designation: '',
    startDate: '',
    manager: '',
    deviceId: '',
    bankDetails: '',
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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      photo: file,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addEmployee({
      ...form,
      id: parseInt(form.id),
    });
    navigate('/employeeManagement'); // Navigate back to employee management page
  };

  return (
    <Layout>
      <div className="employee-form">
        <h3>Add New Employee</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Staff ID:</label>
              <input
                type="number"
                name="id"
                value={form.id}
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
              <label>Gender:</label>
              <select name="gender" value={form.gender} onChange={handleFormChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
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
              <label>Designation/Role:</label>
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Documents (PHOTO):</label>
              <input
                type="file"
                name="photo"
                onChange={handlePhotoUpload}
                required
              />
            </div>
          </div>
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </Layout>
  );
}

export default EmployeeForm;
