import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    const userInfo={      
      email:e.email,
      password:e.password,
  };
    // Reset error message before making the request
    try {
      const response = await axios.post('http://localhost:4001/api/auth/login', userInfo);
      console.log(response);
      // Check if the response contains user data and token
      if (response.data && response.data.user && response.data.token) {
        login(response.data); // Save user info and token in AuthContext
        const userRole = response.data.user.role;

        console.log(response);
        

        // Redirect based on role
        if (userRole === 'manager') navigate('/manager-dashboard');
        else if (userRole === 'staff') navigate('/pantry-dashboard');
        else if (userRole === 'delivery') navigate('/delivery-dashboard');
        else {
          setErrorMessage('Invalid user role.');
        }
      } else {
        setErrorMessage('Invalid login response.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed, please try again.');
      } else {
        setErrorMessage('Network error, please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Login;