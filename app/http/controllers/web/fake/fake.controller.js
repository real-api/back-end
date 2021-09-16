const Controller = require("app/http/controllers/controller");
const FakeService = require('app/http/controllers/web/fake/fake.service')
const { validationResult } = require("express-validator")
let errorList = {}
class FakeController extends Controller {
    async getAllBlogs(req, res, next) {
        try {
            const blogs = await FakeService.getAllBlogs()
            return res.status(200).json({
                status: 200,
                success: true,
                blogs
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllComments(req, res, next) {
        try {
            const comments = await FakeService.getAllComments()
            return res.status(200).json({
                status: 200,
                success: true,
                comments
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async getBlogById(req, res, next) {
        try {
            let result = validationResult(req);
            if (result.isEmpty()) {
                const { id } = req.params;
                const blog = await FakeService.getBlogById(id)
                return res.status(200).json({
                    status: 200,
                    success: true,
                    blog
                })
            } else {
                this.errorHandler(result.errors, errorList);
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: "Bad Request",
                    messages: errorList
                })
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
                const comment = await FakeService.getCommentById(id)
                return res.status(200).json({
                    status: 200,
                    success: true,
                    comment
                })
            } else {
                this.errorHandler(result.errors, errorList);
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: "Bad Request",
                    messages: errorList
                })
            }
        } catch (error) {
            next(error)
        }
    }
    async removeBlogById(req, res, next) {
        try {
            let result = validationResult(req);
            if (result.isEmpty()) {
                const {id} = req.params
                const blog = await FakeService.removeBlog(id)
                if(blog){
                    return res.status(202).json({
                        status: 202,
                        success: true,
                        message: "Deleting Blog Done",
                    })
                }else{
                    throw this.Exception(500, {message : 'can not remove Blog'})
                }
            } else {
                this.errorHandler(result.errors, errorList);
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: "Bad Request",
                    messages: errorList
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
                const {id} = req.params
                const blog = await FakeService.removeComment(id)
                if(blog){
                    return res.status(202).json({
                        status: 202,
                        success: true,
                        message: "Deleting Comment Done",
                    })
                }else{
                    throw this.Exception(500, {message : 'can not remove Comment'})
                }
            } else {
                this.errorHandler(result.errors, errorList);
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: "Bad Request",
                    messages: errorList
                })
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}
module.exports = new FakeController()