const {findFarmer, findOneFarmer} = require('../Repository/FarmerRepositary');

const FarmerController = {
	/***
	 * farmer detail
	 * @param queryData
	 * @returns {Promise<{error: boolean, message}|{data: *, error: boolean, message: string}>}
	 */
	detail: async (queryData) => {
		let result = await findOneFarmer({farmer_id: queryData}, '');
		try {
			if (result) {
				return {
					error: false,
					message: 'Farmer details are.',
					data: result
				};
			}
		} catch (error) {
			return {
				error: true,
				message: error.message
			};
		}
	}
};

module.exports = FarmerController;
