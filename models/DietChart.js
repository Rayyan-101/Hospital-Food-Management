const mongoose = require('mongoose');

const DietChartSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    meals: [
        {
            mealType: { type: String, enum: ['Morning', 'Afternoon', 'Evening', 'Night'], required: true },
            ingredients: { type: String, required: true },
            instructions: { type: String },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DietChart', DietChartSchema);



