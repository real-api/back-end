const path = require("path")
const { body, param, check } = require("express-validator")
const mongoose = require("mongoose")
module.exports = new class SingleFieldsValidator {
    title() {
        return [
            body('title')
                .escape().trim()
                .not().isEmpty()
                .withMessage('عنوان نمیتواند خالی باشد')
        ]
    }
    IsObjectID() {
        return [
            check('id').custom(value => {
                if (mongoose.isValidObjectId(value)) {
                    return true;
                } else {
                    throw new Error('id is invalid')
                }
            })
        ]
    }
    image() {
        return [
            body('image').escape().trim().custom((value, {req}) => {
                console.log(req.file);
                if (value) {
                    console.log(value);
                    const ext = path.extname(value);
                    const exts = ['.png', '.jpg', 'jpeg', '.gif', '.webp', '.svg', '.ico'];
                    if (exts.includes(ext)) return true;
                    throw new Error('please choose an image')
                } else {
                    return true
                }
            })
        ]
    }
}