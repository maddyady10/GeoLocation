import React, { useState } from 'react';
import '../styles/Login.css'; 
import { FaUserCircle } from 'react-icons/fa';  // Import user icon
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here, like redirecting to another page or showing a modal
    console.log('Forgot password clicked');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <FaUserCircle className="user-icon" /> {/* Add user icon here */}
        <h1>GAIL Admin Portal</h1>
        <p className="login-subtitle">Manage your operations with ease</p>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</p> {/* Forgot password option */}
      </div>
    </div>
  );
}

export default Login;
