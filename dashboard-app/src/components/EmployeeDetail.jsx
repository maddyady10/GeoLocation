import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/EmployeeDetail.css'; // Ensure this file exists and path is correct
import Layout from './Layout';
function EmployeeDetail() {
  const location = useLocation();
  const { employee } = location.state || {}; // Extract employee from state

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <Layout>
    <div className="employee-detail">
      <h2>Employee Details</h2>
      <ul>
        <li><strong>Employee ID:</strong> {employee.id}</li>
        <li><strong>Full Name:</strong> {employee.name}</li>
        <li><strong>Designation:</strong> {employee.designation}</li>
        <li><strong>Status:</strong> {employee.status}</li>
        <li><strong>Present:</strong> {employee.present}</li>
        {/* Add more details as needed */}
      </ul>
    </div>
    </Layout>
  );
}

export default EmployeeDetail;
