const formerDB = require('../App/MongooseConnection').create();
const mongoose = require('mongoose');
const Config = require('../App/Config');
const DB_URL = Config.DB_URL;

const MultiDBConnection =  {

    establish: async (Express) => {
        return await new Promise((resolve) => {
            let productDBCheck = false;

            mongoose.set('strictQuery', true);
            try {
                mongoose.connect(DB_URL.PRODUCT_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                console.log('product database connection established');
                productDBCheck = true;
            } catch (error) {
                throw error;
            }
            mongoose.set('debug', true);

            let formerDBCheck = false;
            formerDB.set('strictQuery', true);
            try {
                formerDB.connect(DB_URL.FARMER_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                console.log('former database connection established');
            } catch (error) {
                throw error;
            }
            formerDB.set('debug', true);

            resolve([
                productDBCheck,
                formerDBCheck
            ]);
        })
            .then(() => {
                Express.listen('2072', () => {
                    console.log('server is running in 2072');
                });
            })
            .catch((error) => {
                throw error;
            });
    },
        getProductDBConnection:() => {
        return mongoose;
    },
        getFarmerDBConnection:() => {
        return formerDB;
    }
};
module.exports = MultiDBConnection;