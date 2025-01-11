import React from 'react';
import { useAuth } from '../context/AuthContext';


const DeliveryDashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Delivery Personnel Dashboard</h1>
      <button onClick={logout} className="logout-button">Logout</button>
      {/* Other Delivery Dashboard Content */}
    </div>
  );
};

export default DeliveryDashboard;

