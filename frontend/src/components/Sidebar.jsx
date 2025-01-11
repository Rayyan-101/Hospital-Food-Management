import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/manager-dashboard">Manager Dashboard</Link></li>
        <li><Link to="/pantry-dashboard">Pantry Dashboard</Link></li>
        <li><Link to="/delivery-dashboard">Delivery Dashboard</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
