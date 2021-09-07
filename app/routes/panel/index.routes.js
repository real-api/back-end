const router = require('express').Router()
const BlogRoutes = require('app/routes/panel/blog');
const CommentRoutes = require('app/routes/panel/comment');

router.use('/blogs', BlogRoutes)
router.use('/comments', CommentRoutes)

module.exports = router