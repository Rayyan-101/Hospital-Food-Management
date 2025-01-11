import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DietChart = () => {
  const navigate = useNavigate();
  const [dietCharts, setDietCharts] = useState([]);
  const [newDietChart, setNewDietChart] = useState({
    patient: '',
    meals: [
      { mealType: 'Morning', ingredients: '', instructions: '' },
      { mealType: 'Afternoon', ingredients: '', instructions: '' },
      { mealType: 'Evening', ingredients: '', instructions: '' },
      { mealType: 'Night', ingredients: '', instructions: '' }
    ]
  });
  const [patients, setPatients] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingChart, setEditingChart] = useState(null);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return false;
    }
    return token;
  };

  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Fetch existing diet charts
  const fetchDietCharts = async () => {
    const token = checkAuth();
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:4001/api/dietcharts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDietCharts(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      console.error('Failed to fetch diet charts:', error);
    }
  };

  // Fetch patients for dropdown
  const fetchPatients = async () => {
    const token = checkAuth();
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:4001/api/patients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      console.error('Failed to fetch patients:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = checkAuth();
    if (!token) return;

    try {
      const dietChartData = {
        patient: newDietChart.patient,
        meals: newDietChart.meals
      };

      if (editMode) {
        await axios.put(`http://localhost:4001/api/dietcharts/${editingChart._id}`, dietChartData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditMode(false);
        setEditingChart(null);
      } else {
        await axios.post('http://localhost:4001/api/dietcharts', dietChartData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setNewDietChart({
        patient: '',
        meals: [
          { mealType: 'Morning', ingredients: '', instructions: '' },
          { mealType: 'Afternoon', ingredients: '', instructions: '' },
          { mealType: 'Evening', ingredients: '', instructions: '' },
          { mealType: 'Night', ingredients: '', instructions: '' }
        ]
      });
      fetchDietCharts();
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      console.error('Failed to submit diet chart:', error);
    }
  };

  // Delete a diet chart
  const deleteDietChart = async (id) => {
    const token = checkAuth();
    if (!token) return;

    try {
      await axios.delete(`http://localhost:4001/api/dietcharts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDietCharts();
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      console.error('Failed to delete diet chart:', error);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    const token = checkAuth();
    if (token) {
      fetchDietCharts();
      fetchPatients();
    }
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Diet Charts</h1>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Patient:
          <select
            value={newDietChart.patient}
            onChange={(e) => setNewDietChart({ ...newDietChart, patient: e.target.value })}
            required
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
        </label>
        {newDietChart.meals.map((meal, index) => (
          <div key={meal.mealType}>
            <h3>{meal.mealType} Meal</h3>
            <label>
              Ingredients:
              <input
                type="text"
                value={meal.ingredients}
                onChange={(e) => {
                  const updatedMeals = [...newDietChart.meals];
                  updatedMeals[index].ingredients = e.target.value;
                  setNewDietChart({ ...newDietChart, meals: updatedMeals });
                }}
                required
              />
            </label>
            <label>
              Instructions:
              <input
                type="text"
                value={meal.instructions}
                onChange={(e) => {
                  const updatedMeals = [...newDietChart.meals];
                  updatedMeals[index].instructions = e.target.value;
                  setNewDietChart({ ...newDietChart, meals: updatedMeals });
                }}
              />
            </label>
          </div>
        ))}
        <button type="submit">{editMode ? 'Update' : 'Add'} Diet Chart</button>
      </form>

      <h2>Existing Diet Charts</h2>
      {dietCharts.map((chart) => (
        <div key={chart._id}>
          <p>Patient: {chart.patient?.name || 'Unknown'}</p>
          {chart.meals.map((meal) => (
            <div key={meal.mealType}>
              <p>{meal.mealType}:</p>
              <p>Ingredients: {meal.ingredients}</p>
              <p>Instructions: {meal.instructions}</p>
            </div>
          ))}
          <button onClick={() => {
            setEditMode(true);
            setEditingChart(chart);
            setNewDietChart({ patient: chart.patient._id, meals: chart.meals });
          }}>
            Edit
          </button>
          <button onClick={() => deleteDietChart(chart._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DietChart;