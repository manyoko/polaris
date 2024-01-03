const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
     type: { type: String, required: true, enum: ['hospital','pharmacy','other'],},
     contact: { phone: Number, email: String,},
     paymentInformation: { type: mongoose.Schema.Types.Mixed,},
   }
 );


  
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;