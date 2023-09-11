const FarmerModel = require('../DataBase/FarmerSchemaModel').getFarmerModel();
const {isEmpty} = require('../Helpers/Utils');

const FormerQuery = {
	/**
	 * To do find one query
	 * @param condition
	 * @param projection
	 * @param islean
	 * @returns {Promise<*>}
	 */
	findOneFarmer: async (condition, projection, islean = true) => {
		if (isEmpty(projection)) {
			projection = {
                farmer_id: 1,
				'name.full': 1,
				status: 1,
				createdAt: 1
			};
		}
		let farmer = await FarmerModel.findOne(condition, projection).lean(islean);
		return farmer;
	},

	findFarmer: async (condition, projection, islean = true) => {
		if (isEmpty(projection)) {
			projection = {
				former_id: 1,
				'name.full': 1,
				status: 1,
				createdAt: 1
			};
		}
		let farmer = await FarmerModel.find(condition, projection).lean(islean);
        console.log(123,farmer);
		return farmer;
	}
};

module.exports = FormerQuery;
