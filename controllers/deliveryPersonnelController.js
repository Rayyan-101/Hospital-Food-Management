const DeliveryPersonnel = require('../models/DeliveryPersonnel');

const addDeliveryPersonnel = async (req, res) => {
    const { name, contact, location } = req.body;

    try {
        const deliveryPersonnel = new DeliveryPersonnel({ name, contact, location });
        await deliveryPersonnel.save();
        res.status(201).json(deliveryPersonnel);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add delivery personnel' });
    }
};

const getDeliveryPersonnel = async (req, res) => {
    try {
        const deliveryPersonnel = await DeliveryPersonnel.find();
        res.json(deliveryPersonnel);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch delivery personnel' });
    }
};

const updateDeliveryPersonnel = async (req, res) => {
    try {
        const deliveryPersonnel = await DeliveryPersonnel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(deliveryPersonnel);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update delivery personnel' });
    }
};

const deleteDeliveryPersonnel = async (req, res) => {
    try {
        await DeliveryPersonnel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Delivery personnel deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete delivery personnel' });
    }
};

module.exports = { 
    addDeliveryPersonnel, 
    getDeliveryPersonnel, 
    updateDeliveryPersonnel, 
    deleteDeliveryPersonnel 
};
