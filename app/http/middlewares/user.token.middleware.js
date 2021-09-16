
const UserModel = require("app/models/user.model");
const Middleware = require("app/http/middlewares/Middleware");
const autoBind = require("auto-bind");
class rememberLogin extends Middleware {
    login(req, res, next) {
        if (!req.isAuthenticated()) {
            const token = this.extractToken(req);
            if (token) return this.autoLogin(token, req, next);
        }
        next();
    }
    async autoLogin(token, req, next) {
        const user = await UserModel.findOne({ token })
        if (user) return req.login(user, err =>  next(err))
        next()
    }

}
module.exports = new rememberLogin();