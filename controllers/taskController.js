const Task = require('../models/Task');
const User = require('../models/User');

// Create a new task
const createTask = async (req, res) => {
    const { title, description, assignedTo, type } = req.body;

    try {
        const task = new Task({ title, description, assignedTo, type });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create task' });
    }
};

// Get all tasks or filter by type, status, or assignee
const getTasks = async (req, res) => {
    const { type, status, assignedTo } = req.query;

    try {
        const query = {};
        if (type) query.type = type;
        if (status) query.status = status;
        if (assignedTo) query.assignedTo = assignedTo;

        const tasks = await Task.find(query).populate('assignedTo', 'name role');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

// Update task details or status
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update task' });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete task' });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
