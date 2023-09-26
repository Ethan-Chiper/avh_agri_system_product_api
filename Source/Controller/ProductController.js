const {todayDate, endDate, getNanoId, networkCall, isEmpty} = require('../Helpers/Utils');
const {createUserAndTokenInKong} = require('../Helpers/KongUtils');
const {createProduct} = require('../Repository/productrepositary');
const ProductModel = require('../Models/ProductSchemaModel');

const ProductController = {
    /***
     * create product
     * @param requestData
     * @returns {Promise<{data: *, error: boolean, message: *}|{error: boolean, message: string}>}
     */
    createProduct: async (requestData) => {
        let uniqeID = 'AVH_' + getNanoId();
        let requestObject = {
            product_id: uniqeID,
            name: requestData?.name ?? '',
            price: requestData?.price ?? '',
            tax: requestData?.tax ?? '',
            image: requestData?.image ?? '',
            mmc: requestData?.mmc ?? '',
            status: requestData?.status ?? ''

            // product_id: uniqeID,
            // name: requestData?.name ?? '',
            // description: requestData?.description ?? '',
            // category: requestData?.category ?? '',
            // variety: requestData?.variety ?? '',
            // origin: requestData?.origin ?? '',
            // harvest: {
            // 	season: requestData?.harvest?.season ?? '',
            // 	date: ''
            // },
            // certifications: {
            // 	type: requestData?.certifications?.type ?? '',
            // 	authority: requestData?.certifications?.authority ?? '',
            // 	date: requestData?.certifications?.date ?? ''
            // },
            // price: {
            // 	currency: requestData.price?.currency ?? 'INR',
            // 	amount: requestData?.price?.amount ?? ''
            // },
            // availability: {
            // 	quantity: requestData?.availability ?? '',
            // 	unit: requestData?.availability ?? ''
            // },
            // seller: {
            // 	name: requestData?.seller?.name ?? '',
            // 	contact: {
            // 		email: requestData?.seller?.contact?.email ?? '',
            // 		phone: requestData?.seller?.contact?.phone ?? '',
            // 		address: requestData?.seller?.contact?.address ?? ''
            // 	}
            // },
            // images: {
            // 	url: requestData?.images?.url ?? '',
            // 	caption: requestData?.images?.url ?? ''
            // },
            // nutritional_info: {
            // 	calories_per_unit: requestData?.nutritional_info?.calories_per_unit ?? '',
            // 	nutrients_per_unit: [
            // 		{
            // 			name: requestData?.nutrients_per_unit?.name ?? '',
            // 			value: requestData?.nutrients_per_unit?.value ?? '',
            // 			unit: requestData?.nutrients_per_unit?.unit ?? ''
            // 		},
            // 		{
            // 			name: requestData?.nutrients_per_unit?.name ?? '',
            // 			value: requestData?.nutrients_per_unit?.value ?? '',
            // 			unit: requestData?.nutrients_per_unit?.unit ?? ''
            // 		},
            // 		{
            // 			name: requestData?.nutrients_per_unit?.name ?? '',
            // 			value: requestData?.nutrients_per_unit?.value ?? '',
            // 			unit: requestData?.nutrients_per_unit?.unit ?? ''
            // 		}
            // 	]
            // },
            // packaging_info: {
            // 	type: requestData?.packaging_info?.type ?? '',
            // 	weight: requestData?.packaging_info?.weight ?? 0,
            // 	dimensions: {
            // 		length: requestData?.packaging_info?.dimensions?.length ?? 0,
            // 		width: requestData?.packaging_info?.dimensions?.weight ?? 0,
            // 		height: requestData?.packaging_info?.dimensions?.height ?? 0
            // 	}
            // },
            // shipping_info: {
            // 	shipping_from: requestData?.shipping_info?.shipping_from ?? '',
            // 	shipping_cost: {
            // 		currency: requestData?.shipping_info?.shipping_cost?.currency ?? 'INR',
            // 		amount: requestData?.shipping_info?.shipping_cost?.amount ?? 0
            // 	}
            // }
        };
        try {
            console.log('requestObject', requestObject);
            let product = await ProductModel(requestObject);
            await product.save();
            console.log('product', product);
            if (!isEmpty(product)) {
                let userId = 'product' + '_' + product.product_id;
                await createUserAndTokenInKong(userId, (token) => {
                	if (token)
                        console.log('token', token);
                        return {error: false, message: 'product created successfully'};
                });
                return {
                    error: undefined,
                    message: 'Product create successfully',
                    data: product
                };
            }
            return {error: true, message: 'Could not create Product.', data: undefined};
        } catch (error) {
            return {error: true, message: error, data: undefined};
        }
    }
};
module.exports = ProductController;
