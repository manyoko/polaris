const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Orders = require('../models/order');
const Customer = require('../models/customer');
const Product = require('../models/products');
const {orderController, errorHandler}   = require('../controll/orderControll');
 const validateInput = require('../controll/validateInput'); 
 const createAndSaveOrder = require('../controll/createOrderAndSave');
 const checkStockAndDeduct = require('../controll/checkStockAndDeduct');
 







// modified route to place a pharmaceutical order
router.post('/orders', async (req, res) => {
  try{ 

    if (req.session.user) {
      const { orderBy, items, shippingDetails, deliveryVehicle} = req.body;

       // Validate input
       validateInput(orderBy, items, shippingDetails);

       // Use transaction for data consistency
       const session = await mongoose.startSession();
       // session.startTransaction();

       // Check real-time stock and deduct
       await checkStockAndDeduct(items, session);

       // Create and save new order
       const order = await createAndSaveOrder(shippingDetails, items, orderBy, deliveryVehicle);
       res.status(201).send({ message: "order successfully created"})

       // await session.commitTransaction();

    } else {
      res.status(401).json({ message: "Unauthorized"});
    }
      

  } catch(error){
      console.error(error);
      errorHandler(res, error);
  }
});

router.get('/orders/:id/status', orderController.getOrderStatus);
router.get('/tracking/:vehicleId', orderController.trackDelivery);
router.post('/orders/:id/confirmDelivery', orderController.confirmDelivery);
router.get('/customers/orders/:customerId', orderController.getOrderHistory);






module.exports = router;