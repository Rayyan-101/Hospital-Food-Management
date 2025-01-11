const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController'); // Import the controller

// Route for fetching delivery metrics
router.get('/delivery-metrics', dashboardController.getDeliveryMetrics);

// Route for fetching preparation status metrics
router.get('/preparation-metrics', dashboardController.getPreparationMetrics);

module.exports = router;
