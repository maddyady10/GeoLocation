import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/EmployeeDetail.css'; // Ensure this file exists and path is correct
import Layout from './Layout';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EmployeeDetail() {
  const location = useLocation();
  const { employee } = location.state || {}; // Extract employee from state

  // State to handle the selected date
  const [selectedDate, setSelectedDate] = useState(null);

  // Dummy data for check-in and check-out times
  const attendanceRecords = [
    { checkIn: '08/28/2021 18:30:00', checkOut: '08/28/2021 23:30:00', workHours: '05:00' },
    { checkIn: '08/28/2021 13:30:00', checkOut: '08/28/2021 17:30:00', workHours: '04:00' },
    { checkIn: '08/10/2021 13:30:00', checkOut: '08/10/2021 14:30:00', workHours: '01:00' },
    { checkIn: '08/09/2021 19:02:00', checkOut: '08/10/2021 01:01:00', workHours: '05:59' },
  ];

  // Filter attendance records based on the selected date
  const filteredRecords = selectedDate
    ? attendanceRecords.filter(record =>
        moment(record.checkIn).isSame(moment(selectedDate), 'day')
      )
    : attendanceRecords;

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <Layout>
      <div className="employee-detail">
        <h2>Employee Details</h2>
        <ul>
          <li><img src={employee.image} alt={`${employee.name}'s profile`} /></li>
          <li><strong>Employee ID:</strong> {employee.id}</li>
          <li><strong>Full Name:</strong> {employee.name}</li>
          <li><strong>Designation:</strong> {employee.designation}</li>
          <li><strong>Status:</strong> {employee.status}</li>
          <li><strong>Present:</strong> {employee.present}</li>
          {/* Add more details as needed */}
        </ul>

        <h3>Attendance Records</h3>
        <div className="date-picker-container">
          <label htmlFor="date-picker">Select Date: </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            isClearable
            placeholderText="Choose a date"
          />
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Work Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{moment(record.checkIn).format('MM/DD/YYYY HH:mm:ss')}</td>
                  <td>{moment(record.checkOut).format('MM/DD/YYYY HH:mm:ss')}</td>
                  <td>{record.workHours}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No records found for the selected date</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default EmployeeDetail;
