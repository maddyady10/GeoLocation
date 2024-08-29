import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CalendarComponent from './CalendarComponent'; // Import the new calendar component
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'; // Import Doughnut chart for gauge effect
import '../styles/Dashboard.css'; // You can create this CSS file for styling

// Register the required components for Chart.js
Chart.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const data = {
    present: 70,
    absent: 30,
    active: 50,
    inactive: 50,
  };

  const gaugeData1 = {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [data.present, data.absent],
      backgroundColor: ['#28a745', '#dc3545'],
      borderColor: ['#fff', '#fff'],
      borderWidth: 1,
    }],
  };

  const gaugeData2 = {
    labels: ['Active', 'Inactive'],
    datasets: [{
      data: [data.active, data.inactive],
      backgroundColor: ['#007bff', '#ffc107'],
      borderColor: ['#fff', '#fff'],
      borderWidth: 1,
    }],
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <br></br>
          <h1>Welcome to the Dashboard</h1>
          <h4>Manage employee attendance, view detailed reports, and streamline operations with ease. Everything you need is right here.</h4>

          {/* Statistics */}
          <div className="stats-container">
            <div className="stat-item present">Present: {data.present}</div>
            <div className="stat-item absent">Absent: {data.absent}</div>
            <div className="stat-item active">Active: {data.active}</div>
            <div className="stat-item inactive">Inactive: {data.inactive}</div>
          </div>

          {/* Gauge Charts */}
          <div className="charts-container">
            <div className="chart">
              <h2>Present vs Absent</h2>
              <Doughnut data={gaugeData1} options={{
                cutout: '80%',
                radius: '100%',
                circumference: 180,
                rotation: -90,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`
                    }
                  }
                }
              }} />
            </div>
            <div className="chart">
              <h2>Active vs Inactive</h2>
              <Doughnut data={gaugeData2} options={{
                cutout: '80%',
                radius: '100%',
                circumference: 180,
                rotation: -90,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`
                    }
                  }
                }
              }} />
            </div>
          </div>

          {/* Leave Requests */}
          <div className="leave-requests">
            <h2>Leave Requests</h2>
            <p>No new leave requests</p>
          </div>
        </main>

        {/* Static Calendar Component */}
        <aside className="calendar-section">
          <br></br><br></br>
          <CalendarComponent />
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;
