const {check} = require('express-validator');

const Validate = {
	/**
	 * product Validation
	 * @returns
	 */
	listValidation: () => {
		return [
			check('name', 'please enter the name').notEmpty({ignore_whitespace: true}),
			// check('mobile.national_number').notEmpty().isMobilePhone('en-IN').trim(),
			// check('phone.national_number').notEmpty().isMobilePhone('en-IN').trim(),
			// check('email').notEmpty({ignore_whitespace: true})
		];
	},
    createProduct:() => {
        return [
            check('name', 'please enter the name').notEmpty().trim(),
            check('price', 'please enter price value').notEmpty().trim(),
        ];
    },
    updateStatus:() => {
        return [
            check('product_id', 'please enter product_id').notEmpty().trim(),
            check('name', 'please enter name').notEmpty().trim(),
            check('price', 'please enter price value').notEmpty().trim(),
            check('status', 'please enter status').notEmpty().trim()
        ]
    }
};
module.exports = Validate;
