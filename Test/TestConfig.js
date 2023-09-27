const Dotenv = require('dotenv');
Dotenv.config({path: 'Test/.env'});
const environment = process.env;
module.exports = {
	DB_URL: {
		TEST_PRODUCT_URL: environment.URL_TESTPRODUCTS || 'mongodb://localhost:27017/test_Product',
	}
};
