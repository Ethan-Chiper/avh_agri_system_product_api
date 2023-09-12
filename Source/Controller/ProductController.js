const {todayDate, endDate, getNanoId, networkCall, isEmpty} = require('../Helpers/Utils');
const {createProduct}= require('../Repository/productrepositary');

const ProductController = {
    /***
     * haspicash insurance
     * @param requestData
     * @returns {Promise<{data: *, error: boolean, message: *}|{error: boolean, message: string}>}
     */
    createProduct: async (requestData) => {
        if (isEmpty(requestData)) {
            return {error: true, message: 'data is not found'};
        }
        let uniqeID = 'AVH_' + getNanoId();
        let requestObject = {
            id: uniqeID,
            name: requestData?.name ?? '',
            description: requestData?.description ?? '',
            category: requestData?.category ?? '',
            variety: requestData?.variety ?? '',
            origin: requestData?.origin ?? '',
            harvest: {
                season: requestData?.harvest?.season ?? '',
                date: todayDate
            },
            certifications: {
                type: requestData?.certifications?.type ?? '',
                authority: requestData?.certifications?.authority ?? '',
                date: requestData?.certifications?.date ?? ''
            },
            price: {
                currency: requestData.price?.currency ?? 'INR',
                amount: requestData?.price?.amount ?? ''
            },
            availability: {
                quantity: requestData?.availability ?? '',
                unit: requestData?.availability ?? ''
            },
            seller: {
                name: requestData?.seller?.name ?? '',
                contact: {
                    email: requestData?.seller?.contact?.email ?? '',
                    phone: requestData?.seller?.contact?.phone ?? '',
                    address: requestData?.seller?.contact?.address ?? ''
                }
            },
            images: {
                url: requestData?.images?.url ?? '',
                caption: requestData?.images?.url ?? ''
            },
            nutritional_info: {
                calories_per_unit: requestData?.nutritional_info?.calories_per_unit ?? '',
                nutrients_per_unit: [
                    {
                        name: requestData?.nutrients_per_unit?.name ?? '',
                        value: requestData?.nutrients_per_unit?.value ?? '',
                        unit: requestData?.nutrients_per_unit?.unit ?? ''
                    },
                    {
                        name: requestData?.nutrients_per_unit?.name ?? '',
                        value: requestData?.nutrients_per_unit?.value ?? '',
                        unit: requestData?.nutrients_per_unit?.unit ?? ''
                    },
                    {
                        name: requestData?.nutrients_per_unit?.name ?? '',
                        value: requestData?.nutrients_per_unit?.value ?? '',
                        unit: requestData?.nutrients_per_unit?.unit ?? ''
                    }
                ]
            },
            packaging_info: {
                type: requestData?.packaging_info?.type ?? '',
                weight: requestData?.packaging_info?.weight ?? 0,
                dimensions: {
                    length: requestData?.packaging_info?.dimensions?.length ?? 0,
                    width: requestData?.packaging_info?.dimensions?.weight ?? 0,
                    height: requestData?.packaging_info?.dimensions?.height ?? 0
                }
            },
            shipping_info: {
                shipping_from: requestData?.shipping_info?.shipping_from ?? '',
                shipping_cost: {
                    currency: requestData?.shipping_info?.shipping_cost?.currency ?? 'INR',
                    amount: requestData?.shipping_info?.shipping_cost?.amount ?? 0
                }
            }
        };
        try {
            console.log('requestObject', requestObject);
            let ProductData = await createProduct(requestObject);
            console.log(1,ProductData);
            if(!isEmpty(ProductData)){
                return {error: false, message: 'Product create', data: ProductData};
            }
            return {error: true, message: 'Could not create Product.'};
        } catch (error) {
            return {error: true, message: 'Something went wrong! Please try again'};
        }
    }
};
module.exports = ProductController;