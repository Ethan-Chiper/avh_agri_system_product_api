const FarmerModel = require('../DataBase/FarmerSchemaModel');
const {isEmpty} = require('../Helpers/Utils');

const FormerQuery = {
    /**
     * To do find one query
     * @param condition
     * @param projection
     * @param islean
     * @returns {Promise<*>}
     */
    findOneFarmer: async (condition, projection,  islean = true) => {
        if (isEmpty(condition?.method)) condition.method = 'findOne';
        if (isEmpty(projection)) {
        			projection = {
                        farmer_id: 1,
        				'name.full': 1,
        				status: 1,
        				createdAt: 1
        			};
        		};
        return await FarmerModel[condition.method](condition, projection).lean(islean);

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
        return await FarmerModel.find(condition, projection).lean(islean);
    }
};

module.exports = FormerQuery;
