const deliveryVehicle = require('../models/vehicle')
const express = require('express');
const vehicleRouter = express.Router();

// Route to add a new vehicle to database
vehicleRouter.post('/add', async (req, res) => {
    try {
         // exctract vehicle details from the request body
         const {vehicleId, vehicleName, plateNumber } = req.body;

         // Create a new vehicle instance using the schema
        const newVehicle = new deliveryVehicle({
          vehicleId,
          vehicleName,
          plateNumber
              
         }) 
         // save the product to the mongoDb database
         const saveVehicle = await newVehicle.save()
        // a success response
        res.status(201).json({ message: `${vehicleName} added successfully` });
      } catch (error) {
        // handle error and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' }) 
      }
  
});

module.exports = vehicleRouter;