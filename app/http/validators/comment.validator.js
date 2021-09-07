const mongoose = require("mongoose")
const { body, query, param } = require("express-validator");
class BlogValidator {
    create() {
        return [
            param('blog').custom(value => {
                if (value) {
                    if (mongoose.isValidObjectId(value)) {
                        return true;
                    } else {
                        throw new Error('id value is invalid')
                    }
                } else {
                    return true
                }
            }),
            query('parent').custom(value => {
                if (value) {
                    if (mongoose.isValidObjectId(value)) {
                        return true;
                    } else {
                        throw new Error('parent value is invalid')
                    }
                } else {
                    return true
                }
            }),
            body('text').trim().notEmpty().withMessage("text could not be empty"),
        ]
    }
}

module.exports = new BlogValidator()