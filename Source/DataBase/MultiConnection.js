const mongoose = require('mongoose');
const Config = require('../App/Config');
const DB_URL = Config.AGRI_DB_URL;
const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console()]
});

function MultiDBConnection() {
    /***
     * ProductDBConnection
     */
    this.createConnection = () => {
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => logger.info('Product DB Connected'))
            .catch((err) => logger.info('Product DB Caught', err.stack));
        mongoose.set('debug', true);
    }
    this.getProductDBConnection = () => {
        return mongoose;
    };
}

module.exports = new MultiDBConnection();