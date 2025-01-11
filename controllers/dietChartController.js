const DietChart = require('../models/DietChart');

// Create a diet chart
const createDietChart = async (req, res) => {
    const { patient, meals } = req.body;

    try {
        const dietChart = new DietChart({ patient, meals });
        await dietChart.save();
        res.status(201).json(dietChart);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create diet chart' });
    }
};

// Get diet charts
const getDietCharts = async (req, res) => {
    try {
        const dietCharts = await DietChart.find().populate('patient');
        res.json(dietCharts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch diet charts' });
    }
};

// Update a diet chart
const updateDietChart = async (req, res) => {
    try {
        const dietChart = await DietChart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(dietChart);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update diet chart' });
    }
};

// Delete a diet chart
const deleteDietChart = async (req, res) => {
    try {
        await DietChart.findByIdAndDelete(req.params.id);
        res.json({ message: 'Diet chart deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete diet chart' });
    }
};

module.exports = { createDietChart, getDietCharts, updateDietChart, deleteDietChart };
