const Notification = require('../models/Notification');

// Create a notification
const createNotification = async (req, res) => {
    const { recipient, message } = req.body;

    try {
        const notification = new Notification({ recipient, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create notification' });
    }
};

// Get notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { status: 'Read' }, { new: true });
        res.json(notification);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update notification' });
    }
};

module.exports = { createNotification, getNotifications, markAsRead };
