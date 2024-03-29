const ProductModel = require('../Models/ProductSchemaModel');
const Dotenv = require('dotenv');
Dotenv.config({path: 'Source/App/.env'});
const {isEmpty}=require('../Helpers/Utils');

const ProductQuery = {
    /***
     * create product
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createProduct: async (queryOptions) => {
        let document = queryOptions?.document ?? {};
        let options = queryOptions?.options ?? {};
        let product = await ProductModel.create([document], options);
        return product[0];
    },
    /**
     * find value
     * @param {*} condition 
     * @param {*} projection 
     * @param {*} useLean 
     * @returns 
     */
    findOneProduct: async (condition, projection) => {
		if (isEmpty(projection)) projection = {}
		return await ProductModel.findOne(condition, projection);
	},
    /**
     * find product
     * @param {*} condition 
     * @param {*} projection 
     * @param {*} islean 
     * @returns 
     */
    findProduct: async (condition, projection, islean = true) => {
		return await ProductModel.find(condition, projection).lean(islean);
	},
    /**
     * delete value
     * @param {*} condition 
     * @returns 
     */
    deleteProduct: async (condition) => {
        let options = condition?.options || {};
        return await ProductModel.deleteOne(condition, options);
    }
};

module.exports = ProductQuery;
