const Controller = require("app/http/controllers/controller");
const { validationResult } = require("express-validator")
const BlogModel = require("app/models/blog.model")
const BlogDTO = require("app/http/controllers/api/panel/blogs/blog.dto")
let errorList = {}
class BlogService extends Controller {
    blogDto;
    async createBlog(user, req) {
        const count = await BlogModel.where({ user }).count()
        if (count >= 10) throw this.Exception(403, { message: "Each user's share is 10 blogs" })
        let image = this.getFileName(req.file)
        req.body.image = image
        let tags = req.body.tags.split(/[\=\-\,\;\:\،\/\*\+]/gi);
        req.body.tags = tags
        this.blogDto = new BlogDTO(req.body)
        this.removeEmptyProperty(this.blogDto)
        const blog = await BlogModel.create({ ...this.blogDto, user }).then(doc => {
            return doc
        }).catch(error => {
            throw this.Exception(500, { message: 'blog creating failed' })
        })
        if (!blog) throw this.Exception(500, { message: 'blog creating failed' })
        return blog
    }
    async getBlogById(_id, user) {
        let object = user ? { _id, user } : { _id };
        let blog = await BlogModel.findOne(object);
        if (!blog) throw this.Exception(404, { message: "Not Found any Blog" })
        return blog

    }
    async getAllBlogs(user) {
        const blogs = await BlogModel.find({ user }).catch(err => {
            throw this.Exception(500, { message: 'can not fetch blogs' })
        })
        return blogs
    }
    async removeBlog(_id, user) {
        const blog = await this.getBlogById(_id, user);
        this.removeImage(blog.image)
        await BlogModel.deleteOne({ _id }).catch(err => {
            throw this.Exception(500, { message: 'can not delete blog' })
        })
        return blog
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