const ProductModel = require('../Models/ProductSchemaModel');

const ProductQuery = {
    /***
     * create product
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createProduct: async (queryOptions) => {
        let document = queryOptions?.document || {};
        let options = queryOptions?.options || {};
        console.log('document', document);
        let product = await ProductModel.create([document], options);
        return product[0];
        // let product = await ProductModel(document);
        // await product.save();
        // console.log(1,product)
        // return product;
    }
};

module.exports = ProductQuery;
