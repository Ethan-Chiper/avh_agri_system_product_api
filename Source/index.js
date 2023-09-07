const Express = require('express');
const app = Express();
let helmet = require('helmet');
app.use(helmet.hidePoweredBy());
const bodyParser = require('body-parser');
const ExpressIgniter = require('./App/Connection').expressIgniter;

const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console(),]
});

require('./Database/MultiConnection').createConnection();
app.use(bodyParser.json());

app.use('/api/product', require('./Routes/ProductRouter'));


ExpressIgniter(app);

