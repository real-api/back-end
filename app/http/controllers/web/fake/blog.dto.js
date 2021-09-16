module.exports = class BlogDTO {
    title;
    text;
    image;
    tags;
    constructor(blog) {
        this.title = blog.title
        this.text = blog.text
        this.image = blog.image
        this.tags = blog.tags
    }
}