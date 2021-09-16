const mongoose = require("mongoose")
const {Schema, model, Types} = mongoose;
const BlockedIPSchema = new Schema({
    ip : {type : String, default : undefined},
    user : {type : Types.ObjectId, ref : 'user', default : undefined},
    path : {type : String, default : undefined}
}, {
    timestamps : true
})

const BlockedIPModel = model('blocked_ip', BlockedIPSchema);
module.exports = BlockedIPModel;