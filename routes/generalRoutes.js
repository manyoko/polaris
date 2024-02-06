const express = require('express');
const Products = require('../models/products');
const generalRouter = express.Router();
const app = express()
const mongoose = require('mongoose');



generalRouter.get('/pharmacy', async (req, res) => {
    try {
        const products = await Products.find();
        res.render("pharmacy_page", { pageTitle: "Welcome to my website",
                              pageContent: "This is sample page using handlebars" })
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error locating contact page')
    }
});

generalRouter.get('/contact', async (req, res) => {
    try {

        const products = await Products.find();
        res.render("contact", { pageTitle: "Welcome to my website",
                              pageContent: "This is sample page using handlebars" })
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error locating contact page')
    }
});

generalRouter.get('/about', async (req, res) => {
    try {
        const products = await Products.find();
        res.render("about", { pageTitle: "Welcome to my website",
                              pageContent: "This is sample page using handlebars" })
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error locating contact page')
    }
});


module.exports = generalRouter;