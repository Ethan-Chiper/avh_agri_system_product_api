const Express = require('express');
const App = Express();
let helmet = require('helmet');
App.use(helmet.hidePoweredBy());
const bodyParser = require('body-parser');


const ExpressIgniter = require('./App/Connection').expressIgniter;

const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console(),]
});

require('./Database/MultiConnection').createConnection();
App.use(bodyParser.json());

App.use('/api/product', require('./Routes/ProductRouter'));
App.use('/api/former', require('./Routes/FarmerRouter'));

// require('./DataBase/MultiConnection').establish(App);

ExpressIgniter(App);
// module.exports = App;

