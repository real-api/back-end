const CommentService = require("app/http/controllers/api/panel/comments/comment.service")
const Controller = require("app/http/controllers/controller");
const { validationResult } = require("express-validator");
let errorList = {}
class CommentController extends Controller {
    async getAllComments(req, res, next) {
        try {
            const user = req.user._id.toString();
            const comments = await CommentService.getAllComments(user);
            return res.status(200).json({
                status: 200,
                success: true,
                comments
            })
        } catch (error) {
            next(error)
        }
    }
    async getBlogComments(req, res, next) {
        try {
            let result = validationResult(req);
            if (result.isEmpty()) {
                const user = req.user._id.toString();
                const blog = req.params.blog.toString()
                const comments = await CommentService.getBlogComments(user, blog);
                return res.status(200).json({
                    status: 200,
                    success: true,
                    comments
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: "Bad Request",
                    message: 'Blog value is invalid',
                })
            }
        } catch (error) {
            next(error)
        }
    }
    async createComment(req, res, next) {
        try {
            let result = validationResult(req)
            if (result.isEmpty()) {
                if (!(req.query.parent && req.params.blog)) {
                    const user = req.user._id.toString();
                    const comment = await CommentService.createComment(user, req);
                    return res.status(201).json({
                        status: 201,
                        success: true,
                        message: 'insert comment done',
                        comment
                    })
                } else {
                    return res.status(400).json({
                        status: 400,
                        success: false,
                        error: "Bad Request",
                        message: 'You can not submit parent and blog values at the same timee',
                    })
                }
            } else {
                this.errorHandler(result.errors, errorList);
                throw this.Exception(400, { messages: errorList })
            }

        } catch (error) {
            next(error)
        }
    }
    async getCommentById(req, res, next) {
        try {
            let result = validationResult(req);
            if (result.isEmpty()) {
                const { id } = req.params;
                const user = req.user._id.toString();
                const comment = await CommentService.getCommentById(id, user);
                return res.status(200).json({
                    status: 200,
                    success: true,
                    comment
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: "Bad Request",
                    message: 'id is invalid',
                })
            }
        } catch (error) {
            next(error)
        }
    }
    async removeCommentById(req, res, next) {
        try {
            let result = validationResult(req);
            if (result.isEmpty()) {
                const { id } = req.params;
                const user = req.user._id.toString();
                const comment = await CommentService.removeCommentById(id, user);
                return res.status(202).json({
                    status: 202,
                    success: true,
                    message: 'remove comment done',
                    comment
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: "Bad Request",
                    message: 'id is invalid',
                })
            }
        } catch (error) {
            next(error)
        }
    }
    async confirmComment(req, res, next) {
        try {
            let result = validationResult(req);
            if (result.isEmpty()) {
                const { id } = req.params;
                const user = req.user._id.toString();
                const comment = await CommentService.confirmComment(id, user);
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "confirm comment done",
                    comment
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: "Bad Request",
                    message: 'Blog value is invalid',
                })
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}
module.exports = new CommentController();