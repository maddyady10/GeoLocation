// src/components/EmployeeManagement.jsx
import React, { useState } from 'react';
import '../styles/EmployeeManagement.css'; // Optional: Create a CSS file for styling
import Layout from './Layout';

function EmployeeManagement() {
  const [employees] = useState([
    { id: 1, name: 'John Doe', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', status: 'Inactive' },
    // Add more employee data here
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <Layout>
    <div className="employee-management">
      <h2>Employee Management</h2>
      <div className="employee-list">
        <h3>Employee List</h3>
        <input
          type="text"
          placeholder="Search by name or ID..."
          className="search-input"
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} onClick={() => setSelectedEmployee(employee)}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployee && (
        <div className="employee-detail">
          <h3>Employee Details</h3>
          <p><strong>ID:</strong> {selectedEmployee.id}</p>
          <p><strong>Name:</strong> {selectedEmployee.name}</p>
          <p><strong>Department:</strong> {selectedEmployee.department}</p>
          <p><strong>Status:</strong> {selectedEmployee.status}</p>
          {/* Add check-in/check-out history and associated office locations here */}
        </div>
      )}
    </div>
    </Layout>
  );
}

export default EmployeeManagement;
