const express = require('express');
const router = express.Router();
const { createDietChart, getDietCharts, updateDietChart, deleteDietChart } = require('../controllers/dietChartController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/dietcharts
router.post('/', authMiddleware, createDietChart);

// GET /api/dietcharts
router.get('/', authMiddleware, getDietCharts);

// PUT /api/dietcharts/:id
router.put('/:id', authMiddleware, updateDietChart);

// DELETE /api/dietcharts/:id
router.delete('/:id', authMiddleware, deleteDietChart);

module.exports = router;
