const express = require('express');
const router = express.Router();
const { addDeliveryPersonnel, getDeliveryPersonnel, updateDeliveryPersonnel, deleteDeliveryPersonnel } = require('../controllers/deliveryPersonnelController'); // Check import
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/delivery
router.post('/', authMiddleware, addDeliveryPersonnel);

// GET /api/delivery
router.get('/', authMiddleware, getDeliveryPersonnel);

// PUT /api/delivery/:id
router.put('/:id', authMiddleware, updateDeliveryPersonnel);

// DELETE /api/delivery/:id
router.delete('/:id', authMiddleware, deleteDeliveryPersonnel);

module.exports = router;
