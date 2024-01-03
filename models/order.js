const mongoose = require('mongoose');
//const DeliveryVehicle = require('./vehicle');



const DeliveryVehicleSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
    },
    location: {
        type: { type: String, enum: ['point']},
        coordinates: { type: [Number]},
    },
});

// defining Schema for orders
const OrderItemSchema = new mongoose.Schema({
  product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      },
      quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true},
  totalPrice: {
      type: Number,
      required: true,
      },}
  );

  



const OrderSchema = new mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId,
   

    orderBy : { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
    orderDate: { type: Date, default: Date.now,},
    status: { type: String, enum: ['open', 'processing','shipped', 'delivered', 'cancelled'],default: 'open'},
    items : [OrderItemSchema],
    shippingDetails: {
        address: { street: String, district: String, region: String,},
        estimatedDelivery: String,
        
    },
    deliveryVehicle: {DeliveryVehicleSchema},
    //totalAmount: { type: String, required: true},
    
});


// Create a mongodb model for orders using the schema
const Order= mongoose.model('Order', OrderSchema);

module.exports = Order;

  
