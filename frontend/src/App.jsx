import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ManagerDashboard from './pages/ManagerDashboard';
import PantryDashboard from './pages/PantryDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import Signup from './pages/Signup';

const App = () => {
  const { role } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Signup/>} />
        {/* Protect routes based on roles */}
        <Route
          path="/manager-dashboard"
          element={ <ManagerDashboard />}
        />
        <Route
          path="/pantry-dashboard"
          element={<PantryDashboard />}
        />
        <Route
          path="/delivery-dashboard"
          element={ <DeliveryDashboard />}
        />
      </Routes>
    </Router>
  );
};


export default App;
