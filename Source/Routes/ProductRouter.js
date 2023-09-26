const Express = require('express');
const Router = Express.Router();
const ProductController = require('../Controller/ProductController');
const {isEmpty} = require('../Helpers/Utils');
const {sendFailureMessage, sendSuccessData} = require('../App/Responder');
Router.post('/create', async (request, response) => {
	try {
		let {error, message, data} = await ProductController.createProduct(request?.body);
        console.log(error);
        console.log(message);
        console.log(data);
		if (!isEmpty(data) && error === false) {
            console.log(error === false)
			return sendSuccessData(response, message, data);
		}
		return sendFailureMessage(response, message, 400);
	} catch (error) {
		return sendFailureMessage(response, error, 500);
	}
});

module.exports = Router;
