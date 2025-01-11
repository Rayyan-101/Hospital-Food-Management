const express = require('express');
const router = express.Router();
const { updateMealPreparationStatus, updateDeliveryStatus, getAllDeliveries } = require('../controllers/deliveryTrackingController');
const authMiddleware = require('../middleware/authMiddleware');

// PUT /api/deliveries/preparation/:id
router.put('/preparation/:id', authMiddleware, updateMealPreparationStatus);

// PUT /api/deliveries/status/:id
router.put('/status/:id', authMiddleware, updateDeliveryStatus);

// GET /api/deliveries
router.get('/', authMiddleware, getAllDeliveries);

module.exports = router;
