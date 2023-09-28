require('../Source/index');
const {createProduct, deleteProduct} = require('../Source/Repository/productrepositary');

let product = {
    name: 'test_tomato',
    price: '80'
};
before(async function () {
    await createProduct({document: product});
});
Promise.all([
    require('../Test/Product/initTest')
]);

after(async function () {
    await deleteProduct({price: '80'}, {});
});