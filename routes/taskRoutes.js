const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/tasks - Create a new task
router.post('/', authMiddleware, createTask);

// GET /api/tasks - Get all tasks (with optional filters)
router.get('/', authMiddleware, getTasks);

// PUT /api/tasks/:id - Update a task
router.put('/:id', authMiddleware, updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
