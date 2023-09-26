const DBConnection = require('./MultiConnection');
const ProductConnection = DBConnection.getProductDBConnection();
const timestamps = require('mongoose-timestamp');

const ProductSchema = new ProductConnection.Schema({
	// product_id: {type: String},
	// name: {type: String},
	// description: {type: String},
	// category: {type: String},
	// variety: {type: String},
	// origin: {type: String},
	// harvest: {
	// 	season: {type: String},
	// 	date: {type: String}
	// },
	// certifications: [
	// 	{
	// 		type: {type: String},
	// 		authority: {type: String},
	// 		date: {type: String}
	// 	},
	// 	{
	// 		type: {type: String},
	// 		authority: {type: String},
	// 		date: {type: String}
	// 	}
	// ],
	// price: {
	// 	currency: {type: String},
	// 	amount: {type: String}
	// },
	// availability: {
	// 	quantity: {type: String},
	// 	unit: {type: String}
	// },
	// seller: {
	// 	name: {type: String},
	// 	contact: {
	// 		email: {type: String},
	// 		phone: {type: String},
	// 		address: {type: String}
	// 	}
	// },
	// images: [
	// 	{
	// 		url: {type: String},
	// 		caption: {type: String}
	// 	},
	// 	{
	// 		url: {type: String},
	// 		caption: {type: String}
	// 	}
	// ],
	// nutritional_info: {
	// 	calories_per_unit: {type: String},
	// 	nutrients_per_unit: [
	// 		{
	// 			name: {type: String},
	// 			value: {type: Number},
	// 			unit: {type: String}
	// 		},
	// 		{
	// 			name: {type: String},
	// 			value: {type: Number},
	// 			unit: {type: String}
	// 		},
	// 		{
	// 			name: {type: String},
	// 			value: {type: Number},
	// 			unit: {type: String}
	// 		}
	// 	]
	// },
	// packaging_info: {
	// 	type: {type: String},
	// 	weight: {type: Number},
	// 	dimensions: {
	// 		length: {type: Number},
	// 		width: {type: Number},
	// 		height: {type: Number}
	// 	}
	// },
	// shipping_info: {
	// 	shipping_from: {type: String},
	// 	shipping_cost: {
	// 		currency: {type: String},
	// 		amount: {type: Number}
	// 	}
	// }
    product_id: {type: String, default: ''},
    name: {type: String, default: ''},
    price: {type: String, default: ''},
    tax: {type: String, default: ''},
    image: {type: String, default: ''},
    mmc: {type: String, default: ''},
    status: {type: String, default: 'active'}
});
ProductSchema.plugin(timestamps);

let ProductModel = ProductConnection.model('product', ProductSchema);

module.exports = ProductModel;
