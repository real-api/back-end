const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    text: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: 'comment', default: undefined },
    blog: { type: mongoose.Types.ObjectId, ref: 'blog', default: undefined },
    user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    flag: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
})

CommentSchema.virtual("children", {
    ref: "comment",
    localField: "_id",
    foreignField: "parent"
})
const autoPopulateComment = function (next) {
    this.populate([{ path: "children", match: { flag: true } }, { path: "user", select: { email: 1, name: 1 } }]);
    next()
}

CommentSchema.pre('findOne', autoPopulateComment).pre('find', autoPopulateComment);
CommentSchema.pre('save', function (next) {
    this.populate([{ path: 'user', select: { email: 1, name: 1 } }]);
    next()
})
CommentSchema.pre('find', function (next) {
    this.populate([{ path: 'user', select: { email: 1, name: 1 } }]);
    next()
})
CommentSchema.pre('findOne', function (next) {
    this.populate([{ path: 'user', select: { email: 1, name: 1 } }]);
    next()
})
CommentSchema.virtual('users', {
    ref: 'user',
    localField: "_id",
    foreignField: 'user'
})

const CommentModel = mongoose.model('comment', CommentSchema);
module.exports = CommentModel