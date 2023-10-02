const ProductModel = require('../Models/ProductSchemaModel');
const Dotenv = require('dotenv');
Dotenv.config({path: 'Source/App/.env'});
const ProductQuery = {
    /***
     * create product
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createProduct: async (queryOptions) => {
        let document = queryOptions?.document || {};
        let options = queryOptions?.options || {};
        let product = await ProductModel.create([document], options);
        return product[0];
    },
    deleteProduct: async (condition) => {
        let options = condition?.options || {};
        return await ProductModel.deleteOne(condition, options);
    }
};

module.exports = ProductQuery;
