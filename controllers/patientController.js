const Patient = require('../models/Patient.js');

const addPatient = async (req, res) => {
    const { name, diseases, allergies, room, bed, age, gender, contact, emergencyContact, notes } = req.body;

    try {
        const patient = new Patient({ name, diseases, allergies, room, bed, age, gender, contact, emergencyContact, notes });
        await patient.save();
        res.status(201).json({ message: 'Patient added successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to add patient' });
    }
};

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        console.log(patients);
        res.json(patients);
    } catch (err) {
        console.log("Erros")
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};

const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(patient);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update patient' });
    }
};

const deletePatient = async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete patient' });
    }
};

module.exports = { addPatient, getPatients, updatePatient, deletePatient };
