const mongoose = require('mongoose');

const PantryStaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    assignedTasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PantryStaff', PantryStaffSchema);





  