const express = require('express');
const router = express.Router();
const { createNotification, getNotifications, markAsRead } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/notifications
router.post('/', authMiddleware, createNotification);

// GET /api/notifications
router.get('/', authMiddleware, getNotifications);

// PUT /api/notifications/:id/read
router.put('/:id/read', authMiddleware, markAsRead);

module.exports = router;
