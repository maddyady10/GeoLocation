import React, { useState } from 'react';
import '../styles/EmployeeManagement.css'; // Optional: Create a CSS file for styling
import Layout from './Layout';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'Marketing' },
    // Add more employee data here
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
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

  const [searchQuery, setSearchQuery] = useState('');

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
    // Check if ID is unique
    if (employees.some(employee => employee.id === parseInt(form.id))) {
      alert('Employee ID already exists!');
      return;
    }
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      {
        ...form,
        id: parseInt(form.id),
      },
    ]);
    setForm({
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
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter(employee => {
    const name = employee.fullName ? employee.fullName.toLowerCase() : '';
    return name.includes(searchQuery) || employee.id.toString().includes(searchQuery);
  });
  
  return (
    <Layout>
      <div className="employee-management">
        <h2>Employee Management</h2>

        {/* Employee Form */}
        <div className="employee-form">
          <h3>Add New Employee</h3>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Staff ID:</label>
              <input
                type="number"
                name="id"
                value={form.id}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Gender:</label>
              <select name="gender" value={form.gender} onChange={handleFormChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label>Contact Information (Phone):</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Designation/Role:</label>
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Manager/Supervisor:</label>
              <input
                type="text"
                name="manager"
                value={form.manager}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Device ID:</label>
              <input
                type="text"
                name="deviceId"
                value={form.deviceId}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Bank Details:</label>
              <input
                type="text"
                name="bankDetails"
                value={form.bankDetails}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Documents (PHOTO):</label>
              <input
                type="file"
                name="photo"
                onChange={handlePhotoUpload}
                required
              />
            </div>
            <button type="submit">Add Employee</button>
          </form>
        </div>

        {/* Employee List */}
        <div className="employee-list">
          <h3>Employee List</h3>
          <input
            type="text"
            placeholder="Search by name or ID..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <table>
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} onClick={() => setSelectedEmployee(employee)}>
                  <td>{employee.id}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Employee Details */}
        {selectedEmployee && (
          <div className="employee-detail">
            <h3>Employee Details</h3>
            <p><strong>Staff ID:</strong> {selectedEmployee.id}</p>
            <p><strong>Full Name:</strong> {selectedEmployee.fullName}</p>
            <p><strong>Date of Birth:</strong> {selectedEmployee.dob}</p>
            <p><strong>Gender:</strong> {selectedEmployee.gender}</p>
            <p><strong>Contact Information:</strong> {selectedEmployee.phone}, {selectedEmployee.email}</p>
            <p><strong>Address:</strong> {selectedEmployee.address}</p>
            <p><strong>Department:</strong> {selectedEmployee.department}</p>
            <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
            <p><strong>Start Date:</strong> {selectedEmployee.startDate}</p>
            <p><strong>Manager/Supervisor:</strong> {selectedEmployee.manager}</p>
            <p><strong>Device ID:</strong> {selectedEmployee.deviceId}</p>
            <p><strong>Bank Details:</strong> {selectedEmployee.bankDetails}</p>
            {selectedEmployee.photo && (
              <p><strong>Photo:</strong> <img src={URL.createObjectURL(selectedEmployee.photo)} alt="Employee" /></p>
            )}
            {/* Add check-in/check-out history and associated office locations here */}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default EmployeeManagement;
