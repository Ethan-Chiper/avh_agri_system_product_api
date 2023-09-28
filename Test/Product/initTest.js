const Request =require('supertest');
const Expect = require('chai').expect
const dotenv = require('dotenv');
dotenv.config({path:'database.env'});
let Baseurl = 'http://localhost:2072/api/product';

let requestData = {
    name: 'test_tomato',
    price: '50'
};

// describe('Create product', function () {
//     this.timeout(30000);
//     before(async function () {
//         try {
//             mongoose.connect(TestProductUrl.TEST_PRODUCT_URL, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             });
//             console.log('Connected to MongoDB...');
//         } catch (error) {
//             console.error('Error connecting to MongoDB:', error);
//         }
//     });
//     it('Should create a product with valid request data', function () {
//         ProductController.createProduct(requestData)
//             // Request(Baseurl)
//             //     .post('/product/create')
//             //     .send(requestData)
//             .then(async (response) => {
//                 console.log(response.body);
//                 let resultObject = new ProductTestCaseModel({
//                     product_id: requestData?.product_id,
//                     name: requestData?.name,
//                     price: requestData?.price,
//                     tax: requestData?.tax,
//                     image: requestData?.image,
//                     status: requestData?.status
//                 });
//                 console.log('resultObject', resultObject);
//                 let savedProduct = await ProductTestCaseModel.create(resultObject);
//                 console.log('savedProduct', savedProduct);
//                 Expect(savedProduct).to.be.an('object');
//             })
//     })
// });
describe('Create product', () => {
    it('should create a new product', (done) => {
        Request(Baseurl)
            .post('/create')
            .send(requestData)
            .then((res) => {
                console.log(1,res);
                Expect(res.body).to.be.eql('Product created successfully');
            });
    });
});