const Request = require('supertest');
const Expect = require('chai').expect;
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const ProductTestCaseModel = require('../TestCaseModel/ProductTestCaseModel');
const Baseurl = 'http://localhost:2072/api/product';

let requestData = {
    name: 'Onion'
};

// describe('sample test', function () {
// 	it('sample test for skip', function (done) {
// 		let data = 'hai';
// 		Expect(data).to.be.equal('hai');
// 		done();
// 	});
// });

describe('Create product', function () {
    // it('sample test for skip', function (done) {
    //     let data = 'hai';
    //     Expect(data).to.be.equal('hai');
    //     done();
    // });
    this.timeout(12_000);

    before(async function () {
        await mongoose.connect('mongodb://192.168.0.108:27017/Product', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connected...')
    });
    describe('Saving a Product', function () {
        it('Should create a product with valid request data', function (done) {
            Request(Baseurl)
                .post('/create')
                // .expect(200)
                .send(requestData)
                .then((response) => {
                    console.log(1,response?.body)
                    try {
                        Expect(response?.body?.message).to.be.eql('Product create');
                        describe('Saving a Product', function () {
                            it('should save a new product to the database', async function () {
                                let resultObject = new ProductTestCaseModel({
                                    success: response?.body?.success,
                                    message: response?.body?.message,
                                    data: {
                                        product_id: response?.body?.data?.product_id,
                                        name: response?.body?.data?.name,
                                        price: response?.body?.data?.price,
                                        tax: response?.body?.data?.tax,
                                        image: response?.body?.data?.image,
                                        status: response?.body?.data?.status
                                    }
                                });
                                const savedProduct = await resultObject.save();
                                Expect(savedProduct).to.be.an('object');
                                console.log('test');
                            });
                        });
                    } catch (error) {
                        done(error);
                    }
                })
                .catch((error) => {
                    done(error);
                });
        })
    });
})
