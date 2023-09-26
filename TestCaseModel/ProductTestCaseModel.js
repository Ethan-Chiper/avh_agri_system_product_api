const DBConnection = require('../Source/Models/MultiConnection');
const PropertyDataBase = DBConnection.getTESTProductDBConnection();
const timestamps = require('mongoose-timestamp');

const ProductSchema = new PropertyDataBase.Schema({
    // success: {type: Boolean, default: false},
    // message: {type: String},
    // data: {
    //     product_id: {type: String, default: ''},
    //     name: {type: String, default: ''},
    //     description: {type: String, default: ''},
    //     category: {type: String, default: ''},
    //     variety: {type: String, default: ''},
    //     origin: {type: String, default: ''},
    //     harvest: {
    //         season: {type: String, default: ''},
    //         date: {type: String, default: ''}
    //     },
    //     certifications: [
    //         {
    //             type: {type: String, default: ''},
    //             authority: {type: String, default: ''},
    //             date: {type: String, default: ''}
    //         },
    //         {
    //             type: {type: String, default: ''},
    //             authority: {type: String, default: ''},
    //             date: {type: String, default: ''}
    //         }
    //     ],
    //     price: {
    //         currency: {type: String, default: ''},
    //         amount: {type: String, default: ''}
    //     },
    //     availability: {
    //         quantity: {type: String, default: ''},
    //         unit: {type: String, default: ''}
    //     },
    //     seller: {
    //         name: {type: String, default: ''},
    //         contact: {
    //             email: {type: String, default: ''},
    //             phone: {type: String, default: ''},
    //             address: {type: String, default: ''}
    //         }
    //     },
    //     images: [
    //         {
    //             url: {type: String, default: ''},
    //             caption: {type: String, default: ''}
    //         },
    //         {
    //             url: {type: String, default: ''},
    //             caption: {type: String, default: ''}
    //         }
    //     ],
    //     nutritional_info: {
    //         calories_per_unit: {type: String, default: ''},
    //         nutrients_per_unit: [
    //             {
    //                 name: {type: String, default: ''},
    //                 value: {type: Number, default: ''},
    //                 unit: {type: String, default: ''}
    //             },
    //             {
    //                 name: {type: String, default: ''},
    //                 value: {type: Number, default: ''},
    //                 unit: {type: String, default: ''}
    //             },
    //             {
    //                 name: {type: String, default: ''},
    //                 value: {type: Number, default: 0},
    //                 unit: {type: String, default: ''}
    //             }
    //         ]
    //     },
    //     packaging_info: {
    //         type: {type: String, default: ''},
    //         weight: {type: Number,default: 0},
    //         dimensions: {
    //             length: {type: Number,default: 0},
    //             width: {type: Number,default: 0},
    //             height: {type: Number, default: 0}
    //         }
    //     },
    //     shipping_info: {
    //         shipping_from: {type: String,default: ''},
    //         shipping_cost: {
    //             currency: {type: String,default: ''},
    //             amount: {type: Number,default: ''}
    //         }
    //     }
    // }
    success: {type: Boolean, default: false},
    message: {type: String},
    data: {
        product_id: {type: String, default: ''},
        name: {type: String, default: ''},
        price: {type: String, default: ''},
        tax: {type: String, default: ''},
        image: {type: String, default: ''},
        mmc: {type: String, default: ''},
        status: {type: String, default: ''}
    }
});
ProductSchema.plugin(timestamps);
const ProductModel = PropertyDataBase.model('test_pos_product', ProductSchema);

module.exports = ProductModel;
