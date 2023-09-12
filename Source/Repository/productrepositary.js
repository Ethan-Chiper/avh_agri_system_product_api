const ProductModel=require('../Models/ProductSchemaModel');
const {isEmpty} = require('../Helpers/Utils');

const ProductQuery = {
    /***
     * create product
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createProduct: async (queryOptions) => {
        if(isEmpty(queryOptions)){
            return ProductModel.create(queryOptions);
        }
        return ProductModel.create(queryOptions);
    }
};

module.exports = ProductQuery;
