// src/components/RemoteAccess.jsx
import React, { useState } from 'react';
import '../styles/RemoteAccess.css'; // Optional: Create a CSS file for styling
import Layout from './Layout';

function RemoteAccess() {
  // Sample data for demonstration purposes
  const [pendingApprovals] = useState([
    { id: 1, employeeName: 'John Doe', requestDate: '2024-08-25', reason: 'Work from home' },
    { id: 2, employeeName: 'Jane Smith', requestDate: '2024-08-24', reason: 'Client meeting' },
  ]);

  const [approvedEntries] = useState([
    { id: 1, employeeName: 'Michael Brown', approvedDate: '2024-08-20', reason: 'Conference' },
    { id: 2, employeeName: 'Lisa White', approvedDate: '2024-08-18', reason: 'Training' },
  ]);

  return (
    <Layout>
    <div className="remote-access">
      <h2>Remote Access</h2>
      
      <div className="pending-approvals">
        <h3>Pending Approvals</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Request Date</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingApprovals.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.employeeName}</td>
                <td>{request.requestDate}</td>
                <td>{request.reason}</td>
                <td>
                  <button className="approve-btn">Approve</button>
                  <button className="reject-btn">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="approved-entries">
        <h3>Approved Entries</h3>
        <div className="filters">
          <input
            type="date"
            placeholder="Filter by date"
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Filter by employee"
            className="filter-input"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Approved Date</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {approvedEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.employeeName}</td>
                <td>{entry.approvedDate}</td>
                <td>{entry.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
}

export default RemoteAccess;
