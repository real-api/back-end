module.exports = class CommentDTO {
    text;
    parent;
    blog;
    flag = false;
    constructor(req, blog) {
        this.text = req.body.text;
        this.parent = req.query.parent;
        this.blog = blog
    }
}