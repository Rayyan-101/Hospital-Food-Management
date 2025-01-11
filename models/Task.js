const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskType: { type: String, enum: ['Preparation', 'Delivery'], required: true },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Either a pantry staff or delivery personnel
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    mealDetails: {
        mealType: { type: String, enum: ['Morning', 'Afternoon', 'Evening', 'Night'], required: true },
        deliveryStatus: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);






  