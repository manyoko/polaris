const express = require('express');
const Products = require('../models/products');
const productsRouter = express.Router();
const mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost/', { useNewUrlParser: true, useUnifiedTopology: true}) <== instead of localhost:27017 use 127.0.0.1:27017
mongoose.connect('mongodb://127.0.0.1:27017/polaris')
  .then(() => console.log('Connected!'))
const db = mongoose.connection;

//check Mongodb connection
db.once('open', () => {
    console.log('Connected to the local mongoDB')
})

// Route to add a new pharmaceutical product to database
productsRouter.post('/product', async (req, res) => {
    try {
         // exctract order details from the request body
         const {name, manufacturer,pharmacology, price, stockQuantity,
             manufacturedDate, expireDate, dosageForm, brandName, description, unitPrice, strength } = req.body;

         // Create a new order instance using the schema
        const newProduct = new Products({
          name,
          manufacturer,
          pharmacology, 
          price, 
          stockQuantity,
          manufacturedDate,
          expireDate,
          dosageForm, brandName, description, unitPrice, strength 
              
         }) 
         // save the product to the mongoDb database
         const saveOrder = await newProduct.save()
        // a success response
        res.status(201).json({ message: `${name} added successfully` });
      } catch (error) {
        // handle error and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' }) 
      }
  
});



productsRouter.get('/products', async (req, res) => {
    try {
        const products = await Products.find();
        res.send(`<p>successfully retrieved ${ products.length } products</p>`);
        //res.json(products)
        //res.status(200).send("Products successsfully retrieved")
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving products')
    }
});

productsRouter.get('/products?name=:query', async (req, res) => {
    try{
        const query = req.query.name;
        const products = await Products.find({ name : { $regex: new RegExp(query, i),}});
        res.send(`<p>successfully retrieved ${ products.length } products</p>`);
        res.json(products);
        
    } catch(error) {
        console.error(error);
        res.status(500).send( { message: "internal server Error... we are working to fix it"})
    }
});

productsRouter.get('/products/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        console.log(category);
        const products = await Products.find({
            pharmacology: category,
        });
        res.json(products);

    } catch(error){
        console.error(error);
        res.status(500).send('Error retrieving products by category');

    }
});

productsRouter.get('/products/stock', async (req, res) => {
    try {
        const products = await Products.find();
        const stockData = products.map((product) => ({
            id: product.id,
            name: product.name,
            stock: product.stockQuantity,
        }));
        res.json(stockData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving stock data')
    }
});



module.exports = productsRouter;