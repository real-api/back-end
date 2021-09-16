const { request } = require("express");

class BlogDTO {
    title;
    text;
    image;
    tags;
    constructor(request) {
        this.title = request.body.title
        this.text = request.body.text
        this.image = request.body.image
        this.tags = request.body.tags
        this.userIP = request.ip
    }
}
class CommentDTO {
    text;
    parent;
    blog;
    constructor(request) {
        this.text = request.body.text;
        this.parent = request.query.parent;
        this.blog = request.params.blog;
    }
}
module.exports = {
    CommentDTO,
    BlogDTO
}