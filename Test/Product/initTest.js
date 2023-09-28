const Request =require('supertest');
const Expect = require('chai').expect
const dotenv = require('dotenv');
dotenv.config({path:'Test/.env'});
process.env.NODE_ENV = 'test';
let Baseurl = 'http://localhost:2072/api/product';

let requestData = {
    name: 'test_orange',
    price: '50'
};

describe('Create product', () => {
    it('should create a new product', () => {
        Request(Baseurl)
            .post('/create')
            .send(requestData)
            .expect(200)
            .then(async (response) => {
                console.log(1, response.body);
                Expect(response.body.message).to.be.eql('Product created successfully');
                Expect(response.body.data.price).to.be.eql('50');
                Expect(response.body.data).to.be.eql('object');
                Expect(response.statusCode).to.be.eql(200);
                Expect(response.body.success).to.be.eql(true);
                // let resultObject = {
                //     success: response?.body?.success,
                //     message: response?.body?.message,
                //     data: {
                //         product_id: response?.body?.data?.product_id,
                //         name: response?.body?.data?.name,
                //         price: response?.body?.data?.price,
                //         tax: response?.body?.data?.tax,
                //         image: response?.body?.data?.image,
                //         mmc: response?.body?.data?.mmc,
                //         status: response?.body?.data?.status
                //     }
                // };
                // let savedProduct = await ProductTestCaseModel.create(resultObject);
                // console.log(1, savedProduct);
                // Expect(savedProduct).to.be.eql('object');
            });
    });
    it('Incorrect url', () => {
        Request(Baseurl)
            .post('/product/create')
            .send(requestData)
            .expect(404)
            .then((response) => {
                Expect(response.statusCode).to.be.eql(404);
            });
    });
    it('Should not empty name', () => {
        let productObject = structuredClone(requestData);
        productObject.name = '';
        Request(Baseurl)
            .post('/create')
            .send(productObject)
            .expect(422)
            .then((response) => {
                Expect(response.body.message).to.be.eql('please enter the name');
            });
    });
    it('Should not empty price', () => {
        let invalidData = structuredClone(requestData);
        invalidData.price = '';
        Request(Baseurl)
            .post('/create')
            .send(invalidData)
            .expect(422)
            .then((response) => {
                Expect(response.statusCode).to.eql(422);
            });
    });
});