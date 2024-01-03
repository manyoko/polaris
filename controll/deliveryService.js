const Order = require('../models/order');

const DeliveryVehicle = require('../models/vehicle');

const updateOrderStatus = async (order) => {
    // Update order status based on real-time vehicle location and delivery progress
    //...
    await Order.findByIdAndUpdate(order.id, { orderStatus: updatedOrderStatus });
}

const calculatedEsimatedDeliveryTime = async (order) => {
    // Calculate estimated delivery time based on real-time traffic data and vehicle location
    //..
    return estimatedDeliveryTime 
};

module.exports = { updateOrderStatus, calculatedEsimatedDeliveryTime }