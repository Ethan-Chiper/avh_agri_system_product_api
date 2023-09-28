const mongoose = require('mongoose');
// const TestProductDB = require('../Source/Models/MultiConnection').getProductDBConnection();
const timestamps = require('mongoose-timestamp');

const ProductSchema = new mongoose.Schema({
    success: {type: Boolean, default: false},
    message: {type: String},
    data: {
        product_id: {type: String, default: ''},
        name: {type: String, default: ''},
        price: {type: String, default: ''},
        tax: {type: String, default: ''},
        image: {type: String, default: ''},
        mmc: {type: String, default: ''},
        status: {type: String}
    }
});
ProductSchema.plugin(timestamps);
const ProductModel = mongoose.model('test_product', ProductSchema);

module.exports = ProductModel;
