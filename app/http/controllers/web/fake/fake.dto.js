const { request } = require("express");
const { ObjectId } = require("mongoose").Types
class BlogDTO {
    id;
    title;
    text;
    tags;
    userIP;
    constructor(request) {
        this.id = new ObjectId()
        this.title = request.body.title
        this.text = request.body.text
        this.tags = request.body.tags.split(/[\=\-\,\;\:\،\/\*\+]/gi);
        this.userIP = request.ip
    }
}
class CommentDTO {
    id;
    text;
    parent;
    blog;
    constructor(request) {
        this.id = new ObjectId()
        this.text = request.body.text;
        this.parent = request.query.parent;
        this.blog = request.params.blog;
    }
}
module.exports = {
    CommentDTO,
    BlogDTO
}