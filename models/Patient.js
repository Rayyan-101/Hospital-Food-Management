const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    diseases: { type: String },
    allergies: { type: String },
    room: { type: String },
    bed: { type: String },
    age: { type: Number },
    gender: { type: String },
    contact: { type: String },
    emergencyContact: { type: String },
    notes: { type: String },
});

module.exports = mongoose.model('Patient', PatientSchema);




  
