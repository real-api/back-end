const Controller = require("app/http/controllers/controller");
const BlogService = require('app/http/controllers/api/panel/blogs/blog.service')
const { validationResult } = require("express-validator")
let errorList = {}
class BlogController extends Controller {
    async createBlog(req, res, next) {
        try {
            let result = validationResult(req)
            if (result.isEmpty()) {
                let user = req.user._id.toString()
                const blog = await BlogService.createBlog(user, req);
                console.log(blog);
                return res.status(201).json({
                    status: 201,
                    success: true,
                    message: "Blog Created",
                    blog
                })
            } else {
                this.removeFile(req.file)
                this.errorHandler(result.errors, errorList)
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: "Bad Request",
                    messages: errorList,
                })
            }
        } catch (error) {
            this.removeFile(req.file)
            next(error)
        }
    }

    async getAllBlogs(req, res, next) {
        try {
            const user = req.user._id.toString();
            const blogs = await BlogService.getAllBlogs(user)
            return res.status(200).json({
                status: 200,
                success: true,
                blogs
            })
        } catch (error) {
            next(error)
        }
    }
    async getBlogById(req, res, next) {
        try {
            let result = validationResult(req);
            if (result.isEmpty()) {
                const user = req.user._id.toString();
                const { id } = req.params;
                const blog = await BlogService.getBlogById(id, user)
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
    async removeBlogById(req, res, next) {
        try {
            let result = validationResult(req);
            if (result.isEmpty()) {
                const user = req.user._id.toString();
                const { id } = req.params;
                const blog = await BlogService.removeBlog(id, user)
                return res.status(202).json({
                    status: 202,
                    success: true,
                    message: "Deleting Blog Done",
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
    async updateBlog(req, res, next) {
        try {
            let result = validationResult(req);
            if (result.isEmpty()) {
                const user = req.user._id.toString();
                const { id } = req.params;
                const blog = await BlogService.updateBlog(id, user, req)
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "update Blog Done",
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
            console.log(error);
            next(error)
        }
    }
}
module.exports = new BlogController()