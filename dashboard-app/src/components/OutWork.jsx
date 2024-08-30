import React from 'react';
import '../styles/OutWork.css'; // You can create this CSS file for styling
import Layout from './Layout';

const OutWork = () => (
    <Layout>
  <div className="outwork">
    <h1>Out of Working Hours</h1>
    <p>Our dashboard is available only from 8 AM to 2 PM. Please visit us during these hours to access the full features.</p>
    <p>In the meantime, here are some of our recent updates and news:</p>
    <ul>
      <li>Update 1: New features coming soon!</li>
      <li>Update 2: Check out our latest blog post.</li>
      <li>Update 3: We are working on improving our services.</li>
    </ul>
    {/* Add more relevant content or links */}
  </div>
  </Layout>
);

export default OutWork;
