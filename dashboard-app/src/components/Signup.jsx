import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import '../styles/Signup.css';  // Updated CSS file for Signup
import { FaUserPlus } from 'react-icons/fa';  // Importing icon

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/web/signup', {
        email,
        password
      });
      console.log('Signup response:', response.data);
      alert('Signup successful!');
      navigate('/login');  // Redirect to login page
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <FaUserPlus className="signup-icon" />
        <h1>Signup</h1>
        <p className="signup-subtitle">Create your account</p>
        <form className="signup-form" onSubmit={handleSignup}>
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="signup-button">Signup</button>
        </form>
        <p className="forgot-password">Forgot your password?</p>
      </div>
    </div>
  );
}

export default Signup;
