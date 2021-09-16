const router = require('express').Router()
const BlogController = require('app/http/controllers/api/panel/blogs/blog.controller');
const BlogValidator = require("app/http/validators/blog.validator")
const fields = require("app/http/validators/singleFields")
const upload = require("app/helpers/uploadImg")
router.get('/', BlogController.getAllBlogs)
router.get('/:id', fields.IsObjectID(), BlogController.getBlogById)
router.post('/', upload.single('image'), BlogValidator.create(), BlogController.createBlog)
router.delete('/:id', fields.IsObjectID(), BlogController.removeBlogById)
router.patch('/:id', upload.single('image'),fields.IsObjectID(), fields.image(), BlogController.updateBlog)
module.exports = router