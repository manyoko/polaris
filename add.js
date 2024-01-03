const express = require("express");
const mongoose = require("mongoose");

const app = express();

// mongoose.connect('mongodb://localhost/', { useNewUrlParser: true, useUnifiedTopology: true}) <== instead of localhost:27017 use 127.0.0.1:27017
mongoose.connect('mongodb://127.0.0.1:27017/testdb')
  .then(() => console.log('Connected to testdb!'))
const db = mongoose.connection;

//check Mongodb connection
db.once('open', () => {
    console.log('Connected to the local mongoDB')
})

// express json middleware parse json data from request body
app.use(express.json())

const customerSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    email: { type: String, required : true },
    phoneNumber:  { type: Number, required : true },
    location: { type: String, equired : true},
  
  }
  )
  
  const Customer = mongoose.model("Customer",customerSchema);

// Route to add a customer
app.post('/customer', async (req, res) => {
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
  
     //console.log( req.body)
  
     // a success response
     res.status(201).json({ message: `added successfully` });
  
    } catch(error){
       // handle error and send an error response
       console.error(error);
       res.status(500).json({ message: 'Internal Server Error' }) 
  
    }
  })

  app.listen(3010, () => { console.log("port 3010 lipo live")});