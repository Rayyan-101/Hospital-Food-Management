const Task = require('../models/Task');

// Get delivery metrics
const getDeliveryMetrics = async (req, res) => {
    try {
        const totalDeliveries = await Task.countDocuments();
        const completedDeliveries = await Task.countDocuments({ deliveryStatus: 'Completed' });
        const delayedDeliveries = await Task.countDocuments({ deliveryStatus: 'Delayed' });

        // Response with the delivery metrics
        return res.status(200).json({
            success: true,
            metrics: {
                totalDeliveries,
                completedDeliveries,
                delayedDeliveries,
            },
        });
    } catch (err) {
        console.error("Error fetching delivery metrics:", err);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch delivery metrics',
            error: err.message,
        });
    }
};

// Get preparation status metrics
const getPreparationMetrics = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ preparationStatus: 'Completed' });
        const pendingTasks = await Task.countDocuments({ preparationStatus: 'Pending' });

        // Response with the preparation metrics
        return res.status(200).json({
            success: true,
            metrics: {
                totalTasks,
                completedTasks,
                pendingTasks,
            },
        });
    } catch (err) {
        console.error("Error fetching preparation metrics:", err);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch preparation metrics',
            error: err.message,
        });
    }
};

module.exports = { getDeliveryMetrics, getPreparationMetrics };
