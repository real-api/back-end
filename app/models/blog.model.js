const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: { type: String, default: undefined },
    text: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId,ref : 'user', required: true },
    image: { type: String, default: undefined },
    tags : {type : [String]}
}, {
    timestamps : true,
    toJSON : {virtuals : true}
})
BlogSchema.virtual('user-info', {
    ref : 'user',
    localField : "_id",
    foreignField : 'user'
})
BlogSchema.pre('save', function(next) {
    this.populate([{path : 'user'}]);
    next()
})
BlogSchema.pre('find', function(next){
    this.populate([{path : 'user'}]);
    next()
    
})
BlogSchema.pre('findOne', function(next){
    this.populate([{path : 'user'}]);
    next()
    
})
const BlogModel = mongoose.model('blog', BlogSchema)
module.exports = BlogModel