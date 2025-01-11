const PantryStaff = require('../models/PantryStaff');

const addPantryStaff = async (req, res) => {
    const { name, contact } = req.body;

    try {
        const pantryStaff = new PantryStaff({ name, contact });
        await pantryStaff.save();
        res.status(201).json(pantryStaff);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add pantry staff' });
    }
};

const getPantryStaff = async (req, res) => {
    try {
        const pantryStaff = await PantryStaff.find();
        res.json(pantryStaff);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch pantry staff' });
    }
};

const updatePantryStaff = async (req, res) => {
    try {
        const pantryStaff = await PantryStaff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(pantryStaff);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update pantry staff' });
    }
};

const deletePantryStaff = async (req, res) => {
    try {
        await PantryStaff.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pantry staff deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete pantry staff' });
    }
};

module.exports = { addPantryStaff, getPantryStaff, updatePantryStaff, deletePantryStaff };
