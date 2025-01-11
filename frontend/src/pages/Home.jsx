import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Hospital Management System</h1>
      <Link to="/login">
        <button className="btn btn-primary">Login</button>
      </Link>

      <Link to="/register">
        <button className="btn btn-primary">Signup</button>
      </Link>
    </div>
  );
};

export default Home;
