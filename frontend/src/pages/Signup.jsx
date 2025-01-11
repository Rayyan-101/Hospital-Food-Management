import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navigate, Route, Routes } from "react-router-dom";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '', 
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Update form state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:4001/api/auth/register', formData);
      console.log(response);
      if (response.data && response.data.user && response.data.token) {
        login(response.data);
        const userRole = response.data.user.role;

        // Redirect based on role
        if (userRole === 'manager') ( <Navigate to={"/manager-dashboard"} /> )
        else if (userRole === 'staff') ( <Navigate to={"/pantry-dashboard"} /> )
        else if (userRole === 'delivery') navigate('/delivery-dashboard');
        else setErrorMessage('Invalid user role.');
      } else {
        setErrorMessage('Invalid signup response.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage(error.response?.data?.message || 'Signup failed, please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="delivery">Delivery</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Signup;
