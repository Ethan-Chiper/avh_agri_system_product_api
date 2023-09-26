const ProductModel = require('../Models/ProductSchemaModel');
const {isEmpty} = require('../Helpers/Utils');

const ProductQuery = {
    /***
     * create product
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createProduct: async (queryOptions) => {
        console.log('queryOptions', queryOptions);
        let product = await ProductModel.create(queryOptions);
        console.log('product', product);
        return product;
        // 	let product = ProductModel(queryOptions);
        // console.log('product', product);
        //     return product.save();
    }
};

module.exports = ProductQuery;
