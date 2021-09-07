
const UserModel = require("app/models/user.model");
const Middleware = require("app/http/middlewares/Middleware");
const autoBind = require("auto-bind");
class rememberLogin extends Middleware {
    login(req, res, next) {
        if (!req.isAuthenticated()) {
            const token = req.signedCookies['user-token'] || this.extractToken(req);
            if (token) return this.autoLogin(token, req, next);
        }
        next();
    }
    autoLogin(token, req, next) {
        UserModel.findOne({
            token
        }, (error, user) => {
            if (error) next(error)
            if (user) {
                req.login(user, err => {
                    if (err) next(err)
                    next()
                })
            } else {
                next();
            }
        })
    }

}
module.exports = new rememberLogin();