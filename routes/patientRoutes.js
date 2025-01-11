const express = require('express');
const router = express.Router();
const { addPatient, getPatients, updatePatient, deletePatient } = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/patients
router.post('/', authMiddleware, addPatient);

// GET /api/patients
router.get('/', authMiddleware, getPatients);

// PUT /api/patients/:id
router.put('/:id', authMiddleware, updatePatient);

// DELETE /api/patients/:id
router.delete('/:id', authMiddleware, deletePatient);

module.exports = router;
