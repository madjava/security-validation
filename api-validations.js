// Bring in Express validator
const { check } = require('express-validator');

/** 
 * Various validation middleware
 */

const validateUsernamePassword = [
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


module.exports = {
    validateUsernamePassword
}