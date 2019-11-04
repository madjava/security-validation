// Bring in Express validator
const { check, body, checkSchema} = require('express-validator');

/** 
 * Various validation middleware
 */

const validateUsernamePassword = [ // More validation checks can be added
    check('username')
        .isLength({ min: 1 })
        .withMessage('Login field is required')
        .isAlphanumeric()
        .withMessage('Login must be alphanumeric'),

    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be more than eight')
        .matches('[A-Z]')
        .withMessage('Password must have at least one uppercase character')
        .isAlphanumeric()
        .withMessage('Password must contain at least number and character'),

    check('password')
        .equals('confirmPassword')
        .withMessage('Passwords must match')
];


const validateExpectedInput = [ // More validation checks can be added
    check('expected')
        .not()
        .isArray()
        .withMessage('String value expected not array')
        .isString()
        .withMessage('Must be a string value')
        .isLength({ min: 1 })
        .withMessage('A value is expected')
];

const validatePayload = [ // More validation checks can be added
    checkSchema({
        firstname: {
            in:['body'],
            isString: true,
            errorMessage: 'Firstname must be a string',
            toString: true
        },
        lastname: {
            in: ['body'],
            isString: true,
            errorMessage: 'Lastname must be a string',
            toString: true
        }
    })
];

module.exports = {
    validateUsernamePassword,
    validateExpectedInput,
    validatePayload
}