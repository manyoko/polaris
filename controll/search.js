const express = require("express");
const product = require("../models/products");
const Product = require("../models/products");
const app = express();

// Basic search by name
app.get('/products/search', async (req, res) => {
    try {
        const query = req.query.name;
        if(!query) {
            return res.status(400).json( { error: 'Query parameter "name" is required' } )
        }
        const products = await product.find( {
            name: { $regex: new RegExp(query, 'i')}, // fuzzy matching for partial matches
        });
        res.json(products);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error while searching for products");
    }
});

// Advanced search by multiple criteria, Brand, category, price range, availability
app.get('/products/search', async (req, res) => {
    try {
    // contains search criteria like brand, category, price range etc
    const filters = buildFilters(req.query); // build filter object based om query parameters
    const products = await product.find(filters);
    res.json(products);
    } catch (error){
    console.error(error);
    res.status(500).json({ error: 'Error searching products'})
}
});

function buildFilters(query) {
    const filters = {};
    const validFilters = ['brandname', 'category', 'manufacturer'];

    validFilters.forEach((filter) => {
        if (query[filter]) {
            filters[filter] = query[filter];
        }
    });
   
    return filters;
}

// search by product id
app.get('/products/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }
        res.json(product);

    } catch (error){
        console.error(error);
        res.status(500).json({ error: "Error retrieving product"})
    }
})