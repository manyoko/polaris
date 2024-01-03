const mongoose = require("mongoose");

// defining Schema for products
const productSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    brandName : { type: String, required : true},
    manufacturer : { type: String, required : true},
    dosageForm: {type: String, required: true},
    strength: { type: Number, required: true},
    pharmacology: { type: String, required: true },
    description: { type: String, required: true },
    controlledSubstance: {type: Boolean},
    imageUrl: { type: String,},
    unitPrice: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    manufacturedDate : { type: Date, required: true},
    expireDate : { type: Date, required: true},
    })
  // Create a mongodb model for orders using the schema
  //const Order = mongoose.model('Order', orderSchema);

// Create a mongodb model for products using the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;