const { body } = require("express-validator")
class BlogValidator {
    create() {
        return [
            body('title').notEmpty().withMessage('title is Empty'),
            body('text').trim().custom((value, { req }) => {
                if (value) {
                    return true
                } else {
                    delete req.body.description;
                    return true
                }
            }),
            body('image').custom((value, { req }) => {
                if (req.file) {
                    const ext = req.file.originalname.split(".");
                    const type = "." + ext[parseInt(ext.length-1)]
                    const exts = ['.png', '.jpg', 'jpeg', '.gif', '.webp', '.svg', '.ico'];
                    let size = req.file.size;
                    if (exts.includes(type)) {
                        if (size > 32000) {
                            throw new Error('image size cannot more than 32 kb')
                        } else {
                            return true;
                        }
                    }
                    throw new Error('please choose an image')
                } else {
                    throw new Error('please choose an image')
                }
            }),
            body('tags').notEmpty()
                .withMessage('Please enter at least one tag')
        ]
    }
}

module.exports = new BlogValidator()