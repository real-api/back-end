const Controller = require("app/http/controllers/controller");
const { validationResult } = require("express-validator")
const BlogModel = require("app/models/blog.model")
const UserModel = require("app/models/user.model")
const CommentsModel = require("app/models/comment.model")
const BlogDTO = require("app/http/controllers/api/panel/blogs/blog.dto")
const UserRole = require("app/http/controllers/api/auth/user.role")

let errorList = {}
class BlogService extends Controller {
    blogDto;
    async createBlog(user, req) {
        
    }
    async getBlogById(_id) {
        let blog = await BlogModel.findOne({_id});
        if (!blog) throw this.Exception(404, { message: "Not Found any Blog" })
        return blog
    }
    async getCommentById(_id) {
        let comment = await CommentsModel.findOne({_id});
        if (!comment) throw this.Exception(404, { message: "Not Found any Comment" })
        return comment
    }
    async getAllBlogs() {
        const users = await UserModel.find({ role: UserRole.SUPERADMIN }, { _id: 1 });
        const blogs = await BlogModel.find({ user: { $in: [...users] } }).catch(err => {
            throw this.Exception(500, { message: 'can not fetch blogs' })
        })
        return blogs
    }
    async getAllComments() {
        const users = await UserModel.find({ role: UserRole.SUPERADMIN }, { _id: 1 });
        const comments = await CommentsModel.find({ user: { $in: [...users] }, flag: true }, { 'user.createdAt': 0 }).catch(err => {
            throw this.Exception(500, { message: 'can not fetch comments' })
        })
        return comments
    }
    async removeBlog(_id) {
        const blog = await this.getBlogById(_id);
        return true
    }
    async removeComment(_id) {
        const comment = await this.getCommentById(_id);
        return true
    }
    async updateBlog(_id, user, req) {
        let blog = await this.getBlogById(_id, user);
        let image = this.getFileName(req.file)
        if (image) {
            this.removeImage(blog.image)
            req.body.image = image
        }
        if (req.body.tags) {
            req.body.tags = req.body.tags.split(/[\=\-\,\;\:\،\/\*\+]/gi);
        }
        this.blogDto = new BlogDTO(req.body)
        this.removeEmptyProperty(this.blogDto)
        console.log(this.blogDto);
        await BlogModel.updateOne({ _id: blog._id, user }, { $set: { ...this.blogDto } }).catch(err => {
            console.log(err);
            throw this.Exception(500, { message: 'can not update blog' })
        })
        const updatedBlog = await this.getBlogById(_id, user)
        return updatedBlog
    }
}
module.exports = new BlogService()