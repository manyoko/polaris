const express = require('express');
const Products = require('../models/products');
const Router = express.Router();
const mongoose = require('mongoose');


// route to handle for pharmaceutical searching
Router.get('/search', async (req, res) => {
    try { 
        
     
    } catch (error) {
        console.error("Error retrieving products: ", error);
        res.status(500).json({ error: "Internal server error"});
    }
    

})
// A route to render fprm for adding product
Router.get('/add-product', (req, res) => {
    res.render('add_product');
})

// Route to add a new pharmaceutical product to database
Router.post('/create', async (req, res) => {
    try {
        if (true) { // condition here should check if user is loged in
         // exctract order details from the request body
         const {name, manufacturer,pharmacology, price, stockQuantity,
             manufacturedDate, expireDate, dosageForm, brandName, 
             description, unitPrice, strength, PackagingType, PackagingSize,
              packagingMaterial, unitOfMeasurement, specialPackagingInformation, image } = req.body;

              if (!name || !manufacturer || !pharmacology || !price || !stockQuantity ||
                !manufacturedDate || !expireDate || !dosageForm || !brandName || 
                !description || !unitPrice || !strength || !PackagingType || PackagingSize ||
                 !packagingMaterial || !unitOfMeasurement || !specialPackagingInformation || !image ){
                    res.status(401).json({ message : " fill all the required fields"})

              }

              console.log(req.body)

              const packaging = {
                 "type" : PackagingType,
                 "size": PackagingSize,
                 "material" : packagingMaterial,
                 "unit" : unitOfMeasurement,
                 "specialPackagingInformation" : specialPackagingInformation,           
            }

            console.log(packaging)
      

         // Create a new order instance using the schema
        const newProduct = new Products({
          name,
          image,
          manufacturer,
          pharmacology, 
          price, 
          stockQuantity,
          manufacturedDate,
          expireDate,
          dosageForm, brandName, description, unitPrice, strength,
          packaging
          // packaging.type, packaging.size, packaging.material, packaging.unit, packaging.specialPackagingInformation 
              
         })
         // save the product to the mongoDb database
         const saveOrder = await newProduct.save()
         session.endSession
        // a success response
        res.status(201).json({ message: `${name} added successfully` });
        } else {
            res.status(403).json({ message: "un authorized access" })
        }
      } catch (error) {
        // handle error and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' }) 
      }
  
});


Router.get('/all', async (req, res) => {
    try {
        const products = await Products.find();
        console.log(products);
        res.render("products", { products })
        //res.send(`<p>successfully retrieved ${ products.length } products</p>`);
        //res.json(products)
        //res.status(200).send("Products successsfully retrieved")
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving products')
    }
});

Router.get('/product-detail/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Products.find({
            _id: id,
        });
        console.log(product);
        res.render("product_detail", { product })
        //res.send(`<p>successfully retrieved ${ products.length } products</p>`);
        //res.json(products)
        //res.status(200).send("Products successsfully retrieved")
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving products')
    }
});

Router.get('/products?name=:query', async (req, res) => {
    try{
        const query = req.query.name;
        const products = await Products.findOne({ name : { $regex: new RegExp(query, i),}});
        res.send(`<p>successfully retrieved ${ products.length } products</p>`);
        res.json(products);
        
    } catch(error) {
        console.error(error);
        res.status(500).send( { message: "internal server Error... we are working to fix it"})
    }
});

Router.get('/products/category/:category', async (req, res) => {
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

Router.get('/products/stock', async (req, res) => {
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







module.exports = Router;