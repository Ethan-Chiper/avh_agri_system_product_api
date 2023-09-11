const {todayDate, endDate, getNanoId, networkCall, isEmpty} = require('../Helpers/Utils');
const FormerModel = require('../DataBase/FarmerSchemaModel');
const {findFarmer, findOneFarmer} = require('../Repository/FarmerRepositary')

const FormerController = {
    detail: async (queryData) => {
        const result = await findFarmer({farmer_id:queryData}, '');
        console.log(1, result)
        try {
            if (result) {
                return {
                    error: false,
                    message: 'Former details are.',
                    data: result
                };
            }
        } catch (error) {
            return {
                error: true, message: error.message
            };
        }

    }
};

module.exports = FormerController;