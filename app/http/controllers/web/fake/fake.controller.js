const Controller = require("app/http/controllers/controller");
const FakeService = require('app/http/controllers/web/fake/fake.service')
const { validationResult } = require("express-validator")
const { BlogDTO, CommentDTO } = require("app/http/controllers/web/fake/fake.dto")

let errorList = {}
class FakeController extends Controller {
    async getAllBlogs(req, res, next) {
        try {
            const blogs = await FakeService.getAllBlogs()
            const keyArray = ['id', '__v']
            const newBlogs = 
            this.removeCustomPropertyInArrayOfDBResult(keyArray, blogs);
            return res.status(200).json({
                status: 200,
                success: true,
                blogs : newBlogs
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllComments(req, res, next) {
        try {
            const comments = await FakeService.getAllComments()
            const keyArray = ['flag', 'id', 'children', '__v']
            const newComments = 
            this.removeCustomPropertyInArrayOfDBResult(keyArray, comments);
            return res.status(200).json({
                status: 200,
                success: true,
                comments : newComments
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
                const arrayOfKeys = ['id', '__v']
                const newBlog = this.removeCustomPropertyInObjectOfDBResult(arrayOfKeys, blog)
                
                return res.status(200).json({
                    status: 200,
                    success: true,
                    blog : newBlog
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
                const arrayOfKeys = ['id', '__v', 'flag']
                const newComment = 
                this.removeCustomPropertyInObjectOfDBResult(arrayOfKeys, comment)
                
                return res.status(200).json({
                    status: 200,
                    success: true,
                    comment : newComment
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
                const { id } = req.params
                const blog = await FakeService.removeBlog(id)
                if (blog) {
                    return res.status(202).json({
                        status: 202,
                        success: true,
                        message: "Deleting Blog Done",
                    })
                } else {
                    throw this.Exception(500, { message: 'can not remove Blog' })
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
                const { id } = req.params
                const blog = await FakeService.removeComment(id)
                if (blog) {
                    return res.status(202).json({
                        status: 202,
                        success: true,
                        message: "Deleting Comment Done",
                    })
                } else {
                    throw this.Exception(500, { message: 'can not remove Comment' })
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
    async createBlog(req, res, next) {
        try {
            let blog = new BlogDTO(req);
            this.removeEmptyProperty(blog)
            return res.json({
                ...blog
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async createComment(req, res, next) {
        try {
            let comment = new CommentDTO(req);
            this.removeEmptyProperty(comment)
            return res.json({
                ...comment
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}
module.exports = new FakeController()