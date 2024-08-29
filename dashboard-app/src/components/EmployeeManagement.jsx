import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/EmployeeManagement.css';
import Layout from './Layout';

function EmployeeManagement() {
const [employees] = useState([
    { id: 1, name: 'John Doe', department: 'Engineering',phone:'123456789',email:'johndoe@gmail.com' },
    { id: 2, name: 'Jane Smith', department: 'Marketing',phone:'73483478563',email:'janesmith@gmail.com' },
    // Add more employee data here
]);


  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // const addEmployee = (newEmployee) => {
  //   setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  // };

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
        
        {/* Link to Add New Employee Form */}
        <div className="add-employee-button">
          <Link to="/empform">
            <button>Add New Employee</button>
          </Link>
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
                <th>Phone</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} onClick={() => setSelectedEmployee(employee)}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
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
            <p><strong>Full Name:</strong> {selectedEmployee.Name}</p>
            {/* <p><strong>Date of Birth:</strong> {selectedEmployee.dob}</p>
            <p><strong>Gender:</strong> {selectedEmployee.gender}</p> */}
            <p><strong>Contact Information:</strong> {selectedEmployee.phone}, {selectedEmployee.email}</p>
            {/* <p><strong>Address:</strong> {selectedEmployee.address}</p> */}
            <p><strong>Department:</strong> {selectedEmployee.department}</p>
            <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
            {/* <p><strong>Start Date:</strong> {selectedEmployee.startDate}</p>
            <p><strong>Manager/Supervisor:</strong> {selectedEmployee.manager}</p>
            <p><strong>Device ID:</strong> {selectedEmployee.deviceId}</p>
            <p><strong>Bank Details:</strong> {selectedEmployee.bankDetails}</p> */}
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
