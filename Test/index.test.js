require('../Source/index');
const mongoose = require('mongoose');
const Config = require('../Source/App/Config');
before(async function () {
    try {
        mongoose.connect(Config.DB_URL.PRODUCT_URL, {
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

after(async function () {
    await mongoose.connection.close();
});