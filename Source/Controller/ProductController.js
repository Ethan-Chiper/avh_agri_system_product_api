const {todayDate, endDate, dateFinder,getNanoId, networkCall, isEmpty} = require('../Helpers/Utils');
const {createUserAndTokenInKong,deleteUser} = require('../Helpers/KongUtils');
const {createProduct, findProduct, findOneProduct} = require('../Repository/productrepositary');
const ProductModel = require('../Models/ProductSchemaModel');

const ProductController = {
    /***
     * create product
     * @param requestData
     * @returns {Promise<{data: *, error: boolean, message: *}|{error: boolean, message: string}>}
     */
    createProduct: async (requestData) => {
        try {
            let uniqeID = 'AVH_' + getNanoId();
            let requestObject = {
                product_id: uniqeID,
                name: requestData?.name ?? '',
                description: requestData?.description ?? '',
                category: requestData?.category ?? '',
                variety: requestData?.variety ?? '',
                origin: requestData?.origin ?? '',
                harvest: {
                	season: requestData?.harvest?.season ?? '',
                	date: ''
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
            if (isEmpty(requestObject)) {
                return {
                    error: true,
                    message: 'Request data is not found',
                    data: undefined
                }
            }
            let product = await createProduct({document:requestObject,options: {lean: false}});
            if (isEmpty(product)) {
                return {
                    error: true,
                    message: 'Product data is not saved properly',
                    data: undefined
                };
            }
            let userId = 'product' + '_' + product.product_id;
            await createUserAndTokenInKong(userId, (token) => {
                if (token)
                    console.log('token', token);
                return {error: false, message: 'consumer product_id created successfully'};
            });
            return {
                error: false,
                message: 'product created successfully',
                data: product
            };
        } catch (error) {
            return {
                error: true,
                message: error,
                data: undefined
            };
        }
    },
    /**
     * product list
     * @param {*} query 
     * @param {*} product_id 
     * @returns 
     */
    list: async(query, product_id) => {
        try{
            let queryObject = {};
			let limit = query?.limit ? Number.parseInt(query?.limit) : 20;
			let page = query?.page ? Number.parseInt(query?.page) : 1;
			if (query?.product_id) queryObject['product_id'] = query?.product_id;
			if (query?.name) queryObject['name'] = query?.name;
			if (query?.status) queryObject['status'] = query?.status;
			if (query?.from_date || query?.to_date || query.date_option) {
				queryObject['createdAt'] = dateFinder(query);
			}
            if (product_id) {
				queryObject['product_id'] = product_id;
			}
            let productData = await ProductModel.find(queryObject)
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({_id: -1})
				.lean();
            if(isEmpty(productData)) {
                return {
					error: true,
					message: 'Product list is not found',
					data: undefined
				};
            }
            return {
				error: false,
				message: 'Product list',
				data: productData
			};
        }catch(error){
            return {
				error: error,
				message: 'Product list is not available',
				data: undefined
			};
        }  
    },
    /**
     * status update
     * @param {*} requestData 
     * @returns 
     */
    updateStatus:async(requestData) => {
        try{
            if(isEmpty(requestData)) {
                return{
                    error:true,
                    message: 'request value is not empty'
                }
            }
            let projection = {
                status: 1
            }
            let product = await findOneProduct({product_id:requestData?.product_id}, projection);
            if(isEmpty(product)){
                return {
                    error : true,
                    message : 'Product is not available'
                }
            }else {
                let status = product['status'] === 'active' ? 'deactive' : 'active';
                product.status = status;
                product.markModified('status');
                let result = await product.save();
                return {
					error: false,
                    message: 'Status update successfully!!',
					data: result
				};
            }
        }catch(error) {
            return {
                error: true,
                message: error?.message
            };
        }
    },
    deleteProduct: async (product_id) => {
		if (isEmpty(product_id)) {
			return {error: true, message: 'Unauthorized access.'};
		} else {
			try {
				let product = await findOneProduct({product_id: product_id});
				if (isEmpty(product)) {
					return {error: false, message: 'Invalid Product!'};
				} else {
					let deleteProduct = await deleteUser(product_id);
                    await product.deleteOne();
					if (deleteProduct) {
						return {error: false, data: {}, message: 'Product deleted successfully!'};
					}
					return {error: false, data: {}, message: 'Something went wrong!'};
				}
			} catch (error) {
				return {
					error: true,
					message: error?.message
				};
			}
		}
	}
};
module.exports = ProductController;
