import React from 'react';
import { useAuth } from '../context/AuthContext';

const PantryDashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Pantry Staff Dashboard</h1>
      <button onClick={logout} className="logout-button">Logout</button>
      {/* Other Pantry Staff Dashboard Content */}
    </div>
  );
};

export default PantryDashboard;
