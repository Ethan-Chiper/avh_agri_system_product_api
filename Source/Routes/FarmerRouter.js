const Express = require('express');
const Router = Express.Router();
const {isEmpty} = require('../Helpers/Utils');
const FarmerController = require('../Controller/FarmerController');
const {sendFailureMessage, sendSuccessData, sendSuccessMessage} = require('../App/Responder');

Router.get('/detail/:farmerId', async (request, response) => {
	try {
		let {error, message, data} = await FarmerController.detail(request.params.farmerId);
		if (!isEmpty(data) && error === false) {
			return sendSuccessData(response, message, data);
		}
		return sendFailureMessage(response, message, 400);
	} catch (error) {
		return sendFailureMessage(response, error, 500);
	}
});
module.exports = Router;
