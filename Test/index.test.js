require('../Source/index');
const { deleteProduct} = require('../Source/Repository/productrepositary');
const mongoose = require('mongoose');
before(async function () {
    try {
            mongoose.connect('mongodb://192.168.0.108:27017/stag_Product', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB...');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
});
Promise.all([
    require('../Test/Product/initTest'),

]);
// do not save record.after delete from testcase recode only
after(async function () {
    await deleteProduct({price: '50'}, {});
});