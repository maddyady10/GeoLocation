import React from "react";
import "../styles/Dashboard2.css";
import { Pie } from "react-chartjs-2";
import CalendarComponent from './CalendarComponent';
import { motion } from "framer-motion"; // Import framer-motion for animations
import Layout from './Layout';

const Dashboard2 = () => {
  const data = {
    labels: ["Checked In", "Not Checked In", "On Leave", "Checked Out"],
    datasets: [
      {
        data: [4500, 500, 456, 250],
        backgroundColor: ["#4caf50", "#f44336", "#ffeb3b", "#2196f3"],
        hoverBackgroundColor: ["#66bb6a", "#ef5350", "#ffee58", "#42a5f5"], // Add hover effects
        animation: {
          animateScale: true, // Enable scale animation
          animateRotate: true, // Enable rotation animation
        },
      },
    ],
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard Overview</h1>

        <div className="stats-container">
          <div className="stats-item">
            <h3>Total Employees</h3>
            <p>5000</p>
          </div>
          <div className="stats-item">
            <h3>Checked In</h3>
            <p>4500</p>
          </div>
          <div className="stats-item">
            <h3>Not Checked In</h3>
            <p>500</p>
          </div>
          <div className="stats-item">
            <h3>On Leave</h3>
            <p>456</p>
          </div>
          <div className="stats-item">
            <h3>Checked Out</h3>
            <p>250</p>
          </div>
        </div>

        <div className="charts-calendar-container">
          <motion.div
            className="pie-chart"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Attendance Overview</h3>
            <Pie data={data} />
          </motion.div>

          <div className="calendar-container">
            <h3>Calendar</h3>
            <CalendarComponent />
          </div>
        </div>

        <div className="video-container">
          <h3>Instructional Video</h3>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/eQcICh6Z13c?autoplay=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard2;
