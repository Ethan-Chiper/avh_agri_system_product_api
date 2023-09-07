const Express = require('express');
const Router = Express.Router();
const ProductController = require('../Controller/ProductController');
const {isEmpty} = require('../Helpers/Utils');
const {sendFailureMessage,sendSuccessData,sendSuccessMessage}= require('../App/Responder')
Router.post('/create', async (request, response) => {
    try {
        let {
            error, message, data
        } = await ProductController.createProduct(request?.body);
        if (!isEmpty(data) && error === false) {
            return sendSuccessData(response, message, data);
        }
        return sendFailureMessage(response, message, 400);
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

module.exports = Router;