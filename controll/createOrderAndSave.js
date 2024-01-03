const Order = require('../models/order');

// Order creation and saving function
const CreateAndSaveOrder = async function createAndSaveOrder(customerId, items, orderBy, shippingDetails) { // 
    try {
        const order = new Order({ customerId, items, orderBy, shippingDetails });  // , session
        (await order.save())
        //.session(session);
        
        return order;
    } //catch(error){ console.error(error)}
    finally {
       //session.endSession();
   }
}

module.exports = CreateAndSaveOrder;