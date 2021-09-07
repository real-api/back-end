const CommentModel = require("app/models/comment.model")
const Controller = require("app/http/controllers/controller")
const CommentDTO = require("app/http/controllers/api/panel/comments/comment.dto")
class CommentService extends Controller {
    commentDto;
    async getAllComments(user) {
        const comments = await CommentModel.find({ user , blog : {$ne : undefined}}).populate([{ path: "user", select: { email: 1, name: 1 } }, { path: "children", populate: { path: "parent" } }])
        return comments;
    }
    async getBlogComments(user, blog) {
        const comments = await CommentModel.find({ blog, user, flag: true }).populate([{ path: "user", select: { email: 1, name: 1 } }, { path: "children", populate: { path: "parent", match: { flag: { $eq: true } } } }])
        return comments;
    }
    async createComment(user, req) {
        const blog = req.params.blog;
        this.commentDto = new CommentDTO(req, blog);
        this.removeEmptyProperty(this.commentDto)
        const comment = await CommentModel.create({ ...this.commentDto, user }).then(doc => {
            return doc
        }).catch(err => {
            console.log(err);
            throw this.Exception(500, { message: 'insert new comment is faild' });
        })
        return comment
    }
    async getCommentById(_id, user) {
        let object = user ? { _id, user } : { _id };
        const comment = await CommentModel.findOne(object);
        if (!comment) throw this.Exception(404, { message: 'Not Found any comment' });
        return comment;
    }
    async removeCommentById(_id, user) {
        const comment = await this.getCommentById(_id, user);
        await CommentModel.deleteOne({ _id, user }).then(async doc => {
            await CommentModel.deleteMany({ parent: comment._id })
        }).catch(err => {
            throw this.Exception(500, { message: 'remove comment is faild' })
        })
        return comment;
    }
    async confirmComment(_id, user) {
        const comment = await this.getCommentById(_id, user);
        await CommentModel.updateOne({ _id: comment._id, user }, { $set: { flag: true } }).catch(err => {
            console.log(err);
            throw this.Exception(500, {message : "confirm comment is faild"})
        })
        const updatedComment = await this.getCommentById(comment._id, user);
        return updatedComment
    }
}
module.exports = new CommentService();