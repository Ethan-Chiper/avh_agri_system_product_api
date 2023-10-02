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