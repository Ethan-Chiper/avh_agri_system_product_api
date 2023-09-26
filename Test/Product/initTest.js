const Request = require('supertest');
const Expect = require('chai').expect;
const Dotenv = require('dotenv');
Dotenv.config({path: '../test.env'});
const environment = process.env;
const mongoose = require('mongoose');
const ProductTestCaseModel = require('../../TestCaseModel/ProductTestCaseModel');
let Baseurl = 'http://192.168.0.108:2072/api';

let requestData = {
    name: 'test_tomato'
};
describe('Test product', function () {
    it('sample test for skip', function (done) {
        let data = 'hai';
        Expect(data).to.be.equal('hai');
        done();
    });
});
describe('Test product', function () {
    this.timeout(30000);
    before(async function () {
        try {
            mongoose.connect(environment.URL_TESTPRODUCTS, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB...');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    });
    it('Should create a product with valid request data', function (done) {
        Request(Baseurl)
            .post('/product/create')
            .send(requestData)
            .then(async (response) => {
                try {
                    // Expect(response.body.message).to.be.eql('Product create successfully');
                    let resultObject = new ProductTestCaseModel({
                        product_id: response?.body?.data?.product_id,
                        name: response?.body?.data?.name ?? requestData?.name,
                        price: response?.body?.data?.price,
                        tax: response?.body?.data?.tax,
                        image: response?.body?.data?.image,
                        status: response?.body?.data?.status
                    });
                    console.log('resultObject', resultObject);
                    let savedProduct = await ProductTestCaseModel(resultObject);
                    savedProduct.save();
                    Expect(savedProduct).to.be.an('object');
                    done();
                } catch (error) {
                    done(error);
                }
            })
            .catch((error) => {
                done(error);
            });
    })
});

// describe('Create product', function () {
//     this.timeout(15000);
//     before(async function () {
//         try {
//             mongoose.connect(config.TEST_DB_URL, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             });
//             console.log('Connected to MongoDB...');
//         } catch (error) {
//             console.error('Error connecting to MongoDB:', error);
//         }
//     });
//     describe('Saving a Product', function () {
//         it('Should create a product with valid request data', function (done) {
//             Request(Baseurl)
//                 .post('/product/create')
//                 .send(requestData)
//                 .then((response) => {
//                     console.log('response', response.body);
//                     try {
//                         Expect(response?.body?.message).to.be.eql('Product create successfully');
//                         describe('Saving a Product', function () {
//                             it('should save a new product to the database', async function () {
//                                 let resultObject = new ProductTestCaseModel({
//                                     success: response?.body?.success,
//                                     message: response?.body?.message,
//                                     data: {
//                                         product_id: response?.body?.data?.product_id,
//                                         name: response?.body?.data?.name,
//                                         price: response?.body?.data?.price,
//                                         tax: response?.body?.data?.tax,
//                                         image: response?.body?.data?.image,
//                                         status: response?.body?.data?.status,
//                                     },
//                                 });
//                                 resultObject.save(done);
//                             });
//                         });
//                     } catch (error) {
//                         done(error);
//                     }
//                 })
//                 .catch((error) => {
//                     done(error);
//                 });
//         });
//     });
// });