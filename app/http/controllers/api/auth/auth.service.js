const Controller = require("app/http/controllers/controller");
const passport = require("passport");
const SendVerificationMail = require('app/helpers/nodemailer')
const UserModel = require("app/models/user.model")
module.exports = class AuthService extends Controller {
    login(req, res, next) {
        passport.authenticate("local.login", {
            passReqToCallback: true
        }, (err, user) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: err || "ورود به حساب کاربری انجام نشد، دوباره سعی کنید"
                });
            }
            if (user) {
                req.login(user, err => {
                    if (err) {
                        //error handler
                        return res.status(400).json({
                            status: 400,
                            success: false,
                            message: err || "ورود به حساب کاربری انجام نشد، دوباره سعی کنید"
                        });
                    }
                    if (user) {
                        //login process ....
                        const token = this.jwtGenerator(user._id, user.email);
                        user.token = token;
                        user.save();
                        return res.status(200).json({
                            status: 200,
                            success: true,
                            token
                        })
                    }
                })
            }
        })(req, res, next)
    }
    async register(userDetails) {
        const { email, name } = userDetails
        const user = await UserModel.findOne({ email })
            .catch(err => {
                throw this.Exception(500, { message: "Register Failed" })
            })
        if (user) {
            throw this.Exception(400, { message: 'E-mail exist please try with another' })
        } else {
            const password = this.random_password_generate(16, 8)
            const hashPassword = this.hashPassword(password)
            const newUser = await UserModel.create({ email, name, password : hashPassword })
                .catch(err => {
                    throw this.Exception(500, { message: "Register Failed" })
                })
            let token = await this.jwtGenerator(newUser._id, newUser.email)
            newUser.token = token;
            await newUser.save()
            const result = await SendVerificationMail(email, token, password)
            return { ...result }
        }
    }
}