const mongoose = require("mongoose");

// defining Schema for products
const productSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    brandName : { type: String, required : true},
    manufacturer : { type: String, required : true},
    dosageForm: {type: String, required: true},
    strength: { type: String, required: true},
    pharmacology: { type: String, required: true },
    description: { type: String, required: true },
    controlledSubstance: {type: Boolean},
    image: { type: Buffer, required: true,},
    unitPrice: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    pharmacy : { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
    updatedAt: { type: Date, default: Date.now },
    packaging : {
      type: { type: String, enum: ['Blister pack', 'Bottle', 'Tube', 'Other'], required: true,},
      size: { type: Number, required: true},
      unit : { type: String, required: true},
      material: {type: String, required: true},
       specialInfo: { type: String},
    },
    popular: {type: Boolean,},
    pom : {type: Boolean},
    routeOfAdminstration : {type: String},
    barCode : {type: Number},
    new_product: { type: Boolean,},
    manufacturedDate : { type: Date, required: true},
    expireDate : { type: Date, required: true},
    })
  // Create a mongodb model for orders using the schema
  //const Order = mongoose.model('Order', orderSchema);

// Create a mongodb model for products using the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;