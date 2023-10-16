const Express = require('express');
const Router = Express.Router();
const ProductController = require('../Controller/ProductController');
const {isEmpty} = require('../Helpers/Utils');
const {sendFailureMessage, sendSuccessData} = require('../App/Responder');
const {validationResult} = require('express-validator');
const {createProduct, listValidation, updateStatus} = require('../Validators/ProductValidation');

Router.post('/create', createProduct(), async (request, response) => {
    try {
        let hasErrors = validationResult(request);
        if (hasErrors.isEmpty()) {
            let {error, message, data} = await ProductController.createProduct(request?.body);
            if (!isEmpty(data) && error === false) {
                return sendSuccessData(response, message, data);
            }
        } else {
            return sendFailureMessage(response, hasErrors?.errors[0]?.msg, 422);
        }
        return sendFailureMessage(response, message, 400);
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

Router.get('/list/:productId?', listValidation(), async (request, response) => {
    try {
        let hasErrors = validationResult(request);
        if (hasErrors.isEmpty()) {
            let {error, message, data} = await ProductController.list(request?.query, request?.params?.productId,);
            if (!isEmpty(data) && error === false) {
                return sendSuccessData(response, message, data);
            }
        } else {
            return sendFailureMessage(response, hasErrors?.errors[0]?.msg, 422);
        }
        return sendFailureMessage(response, message, 400);
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

Router.patch('/update_status',updateStatus(), async (request, response) => {
    try{
        let hasError = validationResult(request);
        if(hasError.isEmpty()) {
            let {error, message, data} = await ProductController.updateStatus(request?.body);
            if (!isEmpty(data) && error === false) {
                return sendSuccessData(response, message, data);
            }
        }else {
            return sendFailureMessage(response, hasErrors?.errors[0]?.msg, 422);
        }
        return sendFailureMessage(response, message, 400);
    }catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

module.exports = Router;
