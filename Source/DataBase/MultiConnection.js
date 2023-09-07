const mongoose = require('mongoose');
const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console()]
});

function MultiDBConnection() {
    this.createConnection = () => {
        mongoose.connect('mongodb://192.168.0.108:27017/agri_world', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000
        })
            // mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => logger.info('Product DB Connected'))
            .catch(err => logger.info('Product DB Caught', err.stack));

        this.getProductDBConnection = () => {
            return mongoose;
        };
    }
}

module.exports = new MultiDBConnection();