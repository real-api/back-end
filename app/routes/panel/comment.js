const router = require('express').Router()
const CommentController = require('app/http/controllers/api/panel/comments/comment.controller');
const CommentValidator = require("app/http/validators/comment.validator")
const fields = require("app/http/validators/singleFields")
const upload = require("app/helpers/uploadImg")
router.post('/:blog?', CommentValidator.create(), CommentController.createComment)
router.get('/', CommentController.getAllComments)
router.get('/:blog/blog', fields.IsObjectID(), CommentController.getBlogComments)
router.get('/:id', fields.IsObjectID(), CommentController.getCommentById)
router.delete('/:id', fields.IsObjectID(), CommentController.removeCommentById)
router.patch('/:id', fields.IsObjectID(), CommentController.confirmComment)
module.exports = router