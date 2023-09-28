const Dotenv = require('dotenv');
Dotenv.config({path:'Source/App/.env'});
const environment = process.env;
module.exports = {
	DB_URL: {
		PRODUCT_URL: environment.DB_URL_AGRI_SYSTEM || 'mongodb://192.168.0.108:27017/stag_Product',
		FARMER_URL: environment.DB_URL_AGRI_SYSTEM || 'mongodb://192.168.0.108:27017/agri_world'
	},
	KONG_URL: {
		KONG: environment.KONG_URL || 'http://192.168.0.108:7001/consumers/'
	}
};
