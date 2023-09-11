const Express = require('express');
const App = Express();
let helmet = require('helmet');
App.use(helmet.hidePoweredBy());
const bodyParser = require('body-parser');

const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console(),]
});

App.use(bodyParser.json());

App.use('/api/product', require('./Routes/ProductRouter'));
App.use('/api/former', require('./Routes/FarmerRouter'));

require('./DataBase/MultiConnection').establish(App);

module.exports = App;

