const Connection = require('./MultiConnection');
const ProductConnection = Connection.getProductDBConnection();
const timestamps = require('mongoose-timestamp');
const mongoose = require('mongoose');

function Schema() {

    let ProductSchema = new ProductConnection.Schema({
        product: {
            id: "product_id",
            name: "Product Name",
            description: "Product Description",
            category: "Product Category",
            variety: "Product Variety",
            origin: "Product Origin",
            harvest: {
                season: "Harvest Season",
                date: "Harvest Date"
            },
            certifications: [
                {
                    type: "Certification Type 1",
                    authority: "Certification Authority 1",
                    date: "Certification Date 1"
                },
                {
                    type: "Certification Type 2",
                    authority: "Certification Authority 2",
                    date: "Certification Date 2"
                }
            ],
            price: {
                currency: "USD",
                amount: 10.99
            },
            availability: {
                quantity: 1000,
                unit: "kg"
            },
            seller: {
                name: "Seller Name",
                contact: {
                    email: "seller@email.com",
                    phone: "+1234567890",
                    address: "Seller Address"
                }
            },
            images: [
                {
                    url: "image_url_1.jpg",
                    caption: "Image 1 Caption"
                },
                {
                    url: "image_url_2.jpg",
                    caption: "Image 2 Caption"
                }
            ],
            nutritional_info: {
                calories_per_unit: 50,
                nutrients_per_unit: [
                    {
                        name: "Protein",
                        value: 2.5,
                        unit: "g"
                    },
                    {
                        name: "Carbohydrates",
                        value: 12.5,
                        unit: "g"
                    },
                    {
                        name: "Fat",
                        value: 0.5,
                        unit: "g"
                    }
                ]
            },
            storage_info: {
                temperature: "Store at 2-4°C",
                humidity: "Relative humidity below 60%"
            },
            packaging_info: {
                type: "Packaging Type",
                weight: 1.5,
                dimensions: {
                    length: 10,
                    width: 5,
                    height: 3
                }
            },
            shipping_info: {
                shipping_from: "Shipping Location",
                shipping_cost: {
                    currency: "USD",
                    amount: 5.99
                }
            }
        }
    });
    ProductSchema.plugin(timestamps);

    let productModel = mongoose.model('product', ProductSchema);

    this.getProductModel = () => {
        return productModel;
    };

}

module.exports = new Schema();

