const Express = require('express');
const App = Express();
let helmet = require('helmet');
App.use(helmet.hidePoweredBy());
const bodyParser = require('body-parser');

App.use(bodyParser.json());
/***----------------------------------------------------------------------------------------------**/
App.use('/api/product', require('./Routes/ProductRouter'));
App.use('/api/former', require('./Routes/FarmerRouter'));
/***----------------------------------------------------------------------------------------------**/
require('./Models/MultiConnection').establish(App);

module.exports = App;
