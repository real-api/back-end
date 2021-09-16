const router = require('express').Router()
const FakeController = require('app/http/controllers/web/fake/fake.controller');
router.get('/blogs', FakeController.getAllBlogs)
router.get('/comments', FakeController.getAllComments)
router.get('/blogs/:id', FakeController.getBlogById)
router.get('/comments/:id', FakeController.getCommentById)
router.delete('/blogs/:id', FakeController.removeBlogById)
router.delete('/comments/:id', FakeController.removeCommentById)
module.exports = router