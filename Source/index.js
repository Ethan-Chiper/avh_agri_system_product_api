const Express = require('express');
const App = Express();
let helmet = require('helmet');
App.use(helmet.hidePoweredBy());
const bodyParser = require('body-parser');
App.use(bodyParser.json());
App.use((request, response, next) => {
    const originalSend = response.send;
    response.send = function (body) {
        if (response.locals.middlewareApplied) {
            originalSend.apply(response, arguments);
            return next();
        }
        response.locals.middlewareApplied = true;
        originalSend.apply(response, arguments);
    };

    next();
});
/***----------------------------------------------------------------------------------------------**/
App.use('/api/product', require('./Routes/ProductRouter'));
App.use('/api/former', require('./Routes/FarmerRouter'));
/***----------------------------------------------------------------------------------------------**/

require('./Models/MultiConnection').establish(App);
module.exports = App;
