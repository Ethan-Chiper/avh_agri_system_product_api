const ProductModel=require('../DataBase/ProductSchemaModel');
const {isEmpty} = require('../Helpers/Utils');

const ProductQuery = {

    createProduct: async (queryOptions) => {
        if(isEmpty(queryOptions)){
            return ProductModel.create(queryOptions);
        }
        return ProductModel.create(queryOptions);
    }
};

module.exports = ProductQuery;
