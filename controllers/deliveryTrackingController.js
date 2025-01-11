const Task = require('../models/Task');
const DeliveryPersonnel = require('../models/DeliveryPersonnel');

// Update meal preparation status
const updateMealPreparationStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { preparationStatus: req.body.preparationStatus },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update meal preparation status' });
    }
};

// Update delivery status
const updateDeliveryStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { deliveryStatus: req.body.deliveryStatus },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update delivery status' });
    }
};

// Get all delivery statuses for tracking
const getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Task.find().populate('patient').populate('assignedTo');
        res.json(deliveries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch delivery data' });
    }
};

module.exports = { updateMealPreparationStatus, updateDeliveryStatus, getAllDeliveries };
