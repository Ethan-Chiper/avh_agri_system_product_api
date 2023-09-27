const Request = require('supertest');
const Expect = require('chai').expect;
const TestConfig = require('../TestConfig');
const TestProductUrl = TestConfig.DB_URL;
const mongoose = require('mongoose');
const ProductTestCaseModel = require('../../TestCaseModel/ProductTestCaseModel');
const {getNanoId}=require('../../Source/Helpers/Utils');
let Baseurl = 'http://localhost:2072/api';

let requestData = {
    name: 'test_tomato',
    pricer: '28'
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
            mongoose.connect(TestProductUrl.TEST_PRODUCT_URL, {
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
                console.log('response', response.body);
                try {
                    let resultObject = new ProductTestCaseModel({
                        product_id: requestData?.product_id ?? getNanoId(),
                        name: requestData?.name,
                        price: requestData?.pricer,
                        tax: requestData?.tax,
                        image: requestData?.image,
                        status: requestData?.status
                    });
                    console.log('resultObject', resultObject);
                    let savedProduct = await ProductTestCaseModel.create(resultObject);
                    // let savedProduct = await resultObjects.save();
                    console.log('savedProduct', savedProduct);
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