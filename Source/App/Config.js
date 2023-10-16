const Dotenv = require('dotenv');
Dotenv.config({path: 'Source/App/.env.dev'});
const environment = process.env;
module.exports = {
	DB_URL: {
		PRODUCT_URL: environment.DB_PRODUCT_URL || 'mongodb://192.168.0.102:27017/Product',
		FARMER_URL: environment.DB_URL_AGRI_SYSTEM || 'mongodb://192.168.0.102:27017/agri_world'
	},
	KONG_URL: {
		KONG: environment.KONG_URL || 'http://192.168.0.102:7001/consumers/'
	}
};
