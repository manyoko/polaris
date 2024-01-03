const Product = require('../models/products');

// stock checking and deduction function
const CheckStockAndDeduct = async function checkStockAndDeduct(items, session) {  //, session
    try {
        for(const item of items) {
            const product = await Product.findById(item.product).session(session);  // , { quantity: 1 }
            if (!product || product.stockQuantity < item.quantity) {
                throw new Error(`Insufficient stock for product ${product ? product.name : 'Unknown'}`);
            }
            await Product.findByIdAndUpdate(item.id, { $inc: { StockQuantity: -item.quantity} }).session(session);
        }
    } finally {
        session.endSession();
    }
}

module.exports = CheckStockAndDeduct;