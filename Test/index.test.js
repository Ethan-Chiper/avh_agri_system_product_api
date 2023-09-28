require('../Source/index');
require('./Product/initTest')
const {createProduct} = require('../Source/Repository/productrepositary');

let product = {
    name: 'test_tomato',
    price: '80'
};
before(async function () {
    await createProduct({document: product});
});