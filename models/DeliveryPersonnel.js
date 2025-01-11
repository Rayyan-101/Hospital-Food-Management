const mongoose = require('mongoose');

const DeliveryPersonnelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String },
    availability: { type: Boolean, default: true }, // To check if they are currently available for delivery
});

module.exports = mongoose.model('DeliveryPersonnel', DeliveryPersonnelSchema);


  