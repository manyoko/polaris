const mongoose = require('mongoose');

const DeliveryVehicleSchema = new mongoose.Schema({
    vehicleName: { type: String, required: true },
    plateNumber: { type: String, unique: true},
    vehicleId: {
        type: Number,
        required: true,
    },
    location: {
        type: { type: String, enum: ['point']},
        coordinates: { type: [Number]},
    },
});


module.exports = DeliveryVehicleSchema;
const DeliveryVehicle = mongoose.model('DeliveryVehicle', DeliveryVehicleSchema)
module.exports = DeliveryVehicle;