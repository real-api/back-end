const { body } = require('express-validator')

class AuthValidator {
    login() {
        return [
            body('email').isEmail()
            .withMessage('Email is incorrect'),
            body('password').isLength({ min: 8, max: 16 })
            .withMessage("Password must be between 8 and 16 character")
        ]
    }
    register() {
        return [
            body("name").notEmpty().withMessage("Enter first and last name"),
            body("email").normalizeEmail().isEmail().withMessage('Email is incorrect'),
        ]
    }
}
module.exports = new AuthValidator();