const express = require('express');
const router = express.Router();
const { addPantryStaff, getPantryStaff, updatePantryStaff, deletePantryStaff } = require('../controllers/pantryStaffController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/pantry
router.post('/', authMiddleware, addPantryStaff);

// GET /api/pantry
router.get('/', authMiddleware, getPantryStaff);

// PUT /api/pantry/:id
router.put('/:id', authMiddleware, updatePantryStaff);

// DELETE /api/pantry/:id
router.delete('/:id', authMiddleware, deletePantryStaff);

module.exports = router;
