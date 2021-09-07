const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const UserRole = require("app/http/controllers/api/auth/user.role")
const UserSchema = new Schema({
    name: { type: String, default: undefined },
    email: { type: String, required: true },
    bio : {type : String, default : ""},
    password: { type: String, required: true },
    phone: { type: String, default: undefined },
    role: { type: String, default: UserRole.USER },
    token: { type: String, default: undefined }
}, {
    timestamps : true,
    toJSON : {
        transform : function(doc, ret) {
            delete ret.token;
            delete ret.password;
            delete ret.role;
        }
    },
    toObject : {
        transform : function(doc, ret) {
            delete ret.token;
            delete ret.password;
            delete ret.role;
        }
    }
})
UserSchema.methods.validPassword = async function (password) {
    return await bcrypt.compareSync(password, this.password)
}
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel