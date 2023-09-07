const Dotenv = require('dotenv');
Dotenv.config({path: 'Source/App/.env'});
const environment = process.env;
module.exports = {
    AGRI_DB_URL: environment.DB_URL_AGRI_SYSTEM || 'mongodb://localhost:27017/Product',
};