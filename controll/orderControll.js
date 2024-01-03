const Customer = require('../models/customer');
const Order = require('../models/order');
const Product = require('../models/products');
const DeliveryVehicle = require('../models/vehicle');
const { updateOrderStatus, calculateEstimatedDeliveryTime } = require('./deliveryService');

// order controller on sunday evening
const orderController = {
  getOrderStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const order = await Order.findById(id).populate('deliveryVehicle');
      console.log(order)
      if (!order) {
        return res.status(404).json({ error: 'Order not found'});
      }
     // res.json({
      //  status: order.orderStatus,
       // deliveryVehicleId: order.deliveryVehicleId,
      //  estimatedDeliveryTime: order.estimatedDeliveryTime,
     // });
     res.json({
      message: `the order placed by ${order.orderBy} is ${order.status}`
     })
    } catch(error) {
      console.error(error);
      res.status(500).json({error: 'Error retrieving order status'});
    }
  },

  trackDelivery: async (req, res) => {
    try {
      const vehicleId = req.params.vehicleId;
      const vehicle = await DeliveryVehicle.findOne({ vehicleId });
      if (!vehicle) {
        return res.status(404).json({ error: 'delivery vehicle not found'});
      }
      res.json({ location: vehicle.location });
    } catch(error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving delivery vehicle location'})
    }
  },
  confirmDelivery: async (req, res) => {
    try {
      const id = req.params.id;
      await Order.findByIdAndUpdate(id, { orderStatus: 'delivered' });
      res.status(200).json({ message: 'Order successfully delivered' });
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Error confirming delivery'})
    }
  },
  getOrderHistory: async (req, res) => {
    try {
      const customerId = req.params.customerId;
      console.log(customerId);
      const orders = await Order.find({ orderBy: customerId });
      res.json(orders)
    } catch(error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving order history' });
    }
  }
}

// Error handling function
const errorHandler = function handleError(res, error) {
  if (error.name === 'TransactionError') {
      res.status(500).send('Error processing order. please try again later.');
  } else {
      res.status(500).send(`Error creating order: ${error.message} `);
  }
}


module.exports ={orderController, errorHandler};


// functionality to add later
// implement a background job to update order status and estimated delivery time based on real time vehicle location updates
// send notification emails or sms alerts to users about order status changes
// to integrate map visualization tool for users to track their orders on an interactive map