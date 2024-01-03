const express = require('express');
const Customer = require('../models/customer');
const customerRouter = express.Router();
//const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


// Route to add a customer
customerRouter.post('/customer', async (req, res) => {
    try {
      // exctract order details from the request body
     const { name, location, email, phoneNumber } = req.body;
  
     // create new customer instance using data from body
     const newCustomer = new Customer({
      name,
      location, 
       email, 
       phoneNumber
     })
     // save the customer to the mongoDb database
     const saveCustomer = await newCustomer.save()
  
     console.log( name, location, email, phoneNumber)
  
     // a success response
     res.status(201).json({ message: `${name} added successfully` });
  
    } catch(error){
       // handle error and send an error response
       console.error(error);
       res.status(500).json({ message: 'Internal Server Error' }) 
  
    }
  })
  
  

// this endpoint should return a list of all registered customers. has pagination in cas of large data set
customerRouter.get('/customers', async (req, res) => {
    try {
        const page = req.query.page || 1; // handle pagination
        const limit = req.query.limit || 10 // handle number of customers per page
        const customers = await Customer.find({}, null, { skip: (page-1)*limit});
        const totalCustomers = await Customer.countDocuments();
        res.json({customers, totalCustomers});
    } catch(error){
        console.error(error);
        res.status(500).send('Error retrieving customers');
    }
});

// this endpoint should allow authorized users to register new hospitals or pharmacies
// secure validation and data sanitization will be implemented
customerRouter.post('/customers/create', async (req, res) => {
    try {
        const { user, type, contact } = req.body; 
        console.log( req.body)
        
        //data validation
        if(!user || !type || !contact) {
            return res.status(400).send("Missing required fields");
        }
        // Securely the password is hashed
        //if(paymentInformation&& paymentInformation.cardNumber) {
          //  paymentInformation.cardNumber = bcrypt.hash(paymentInformation.cardNumber, 10);
       // }

        // create and save new customer
        const customer = new Customer({ user, type,contact}); // paymentInformation
        await customer.save();

        res.status(201).json(customer); // 201 for created resources

    }catch(error) {
        console.error(error);
        res.status(500).send('Error creating customer')
    }
});

// this endpoint should enable updating customer information like address or contact details.
// proper access control and data security to be ensured 

customerRouter.put('/customers/update/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { name, shippingAddress, email, contact } = req.body;

        // Validate data and authorized user

        // Update customer information


        await Customer.findByIdAndUpdate(id, { name, email, shippingAddress, contact }, {new: true});
        res.status(200).json({message: 'Customer information updated successfully'});

        

    } catch(error){
        console.error(error);
        res.status(500).send('Error updating customer');

    }
});

module.exports = customerRouter;