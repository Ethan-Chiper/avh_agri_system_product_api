const FarmerModel = require('../Models/FarmerSchemaModel');
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
    /***
     * To do find all query
     * @param condition
     * @param projection
     * @param islean
     * @returns {Promise<awaited Query<Array<THydratedDocumentType> extends null ? (GetLeanResultType<* extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TSchemaOptions, infer DocType> ? DocType : unknown, Array<THydratedDocumentType>, "find"> | null) : GetLeanResultType<* extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TSchemaOptions, infer DocType> ? DocType : unknown, Array<THydratedDocumentType>, "find">, THydratedDocumentType, * extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TSchemaOptions, infer DocType> ? TQueryHelpers : unknown, * extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TSchemaOptions, infer DocType> ? DocType : unknown, "find"> & * extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TSchemaOptions, infer DocType> ? TQueryHelpers : unknown>}
     */
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
