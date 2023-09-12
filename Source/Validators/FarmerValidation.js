const {check} = require('express-validator');

const Validate = {
    /**
     * Farmer Validation
     * @returns
     */
    createfarmerValidation : () => {
        return [
            check('name.full', 'please enter the name').notEmpty({ignore_whitespace: true}),
            check('mobile.national_number').notEmpty().isMobilePhone('en-IN').trim(),
            check('phone.national_number').notEmpty().isMobilePhone('en-IN').trim(),
            check('email').notEmpty({ignore_whitespace: true})
        ];
    }
}
module.exports = Validate
