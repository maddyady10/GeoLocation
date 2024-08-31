import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CalendarComponent from './CalendarComponent';
import { Chart, ArcElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import '../styles/Dashboard.css';
import OutWork from './OutWork';

Chart.register(ArcElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);

const DashboardContent = () => {
  const data = {
    present: 70,
    absent: 30,
    active: 50,
    inactive: 50,
  };

  const doughnutData = {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [data.present, data.absent],
      backgroundColor: ['#28a745', '#dc3545'],
      borderColor: ['#fff', '#fff'],
      borderWidth: 1,
    }],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Monthly Attendance',
      data: [65, 59, 80, 81, 56, 55],
      fill: true,
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderColor: '#00d4ff',
      borderWidth: 2,
      pointBorderColor: '#00d4ff',
      pointBackgroundColor: '#000',
      tension: 0.3,
      hoverBackgroundColor: '#00ff8c',
    }],
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const slideIn = {
    hidden: { x: -100 },
    visible: { x: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div className="dashboard" initial="hidden" animate="visible" variants={fadeIn}>
      <Navbar />
      <div className="dashboard-content">
        <br></br>
        <Sidebar />
        <main className="main-content">
        <br></br>
          <h1>Welcome to the Dashboard</h1>
          <h4>Manage employee attendance, view detailed reports, and streamline operations with ease. Everything you need is right here.</h4>

          <div className="stats-container">
            <motion.div className="stat-item present" variants={slideIn}>Present: {data.present}</motion.div>
            <motion.div className="stat-item absent" variants={slideIn}>Absent: {data.absent}</motion.div>
            <motion.div className="stat-item active" variants={slideIn}>Active: {data.active}</motion.div>
            <motion.div className="stat-item inactive" variants={slideIn}>Inactive: {data.inactive}</motion.div>
          </div>

          {/* Charts Section */}
          <div className="charts-container">
            <motion.div className="chart small-chart" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
              <h2>Present vs Absent</h2>
              <Doughnut
                data={doughnutData}
                options={{
                  cutout: '75%',
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
                }}
              />
            </motion.div>

            <motion.div className="chart" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
              <h2>Attendance Over Time</h2>
              <Line
                data={lineData}
                options={{
                  scales: {
                    x: {
                      beginAtZero: true,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        color: 'black',
                        font: {
                          size: 15,
                        }
                      }
                    },
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                      ticks: {
                        color: 'black',
                        font: {
                          size: 15,
                        }
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        color: '#0033ff',
                        font: {
                          size: 14,
                        }
                      }
                    }
                  }
                }}
              />
            </motion.div>
          </div>

          <motion.div className="leave-requests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2>Leave Requests</h2>
            <p>No new leave requests</p>
          </motion.div>
        </main>

        <aside className="calendar-section">
          <CalendarComponent />
        </aside>
      </div>
    </motion.div>
  );
};

function Dashboard() {
  const [isWithinWorkingHours, setIsWithinWorkingHours] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      setIsWithinWorkingHours(hours >= 0 && hours < 24);
    };

    checkTime(); // Initial check
    const intervalId = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return isWithinWorkingHours ? <DashboardContent /> : <OutWork />;
}

export default Dashboard;
