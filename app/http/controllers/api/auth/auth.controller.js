const Controller = require("app/http/controllers/controller");
const AuthService = require('app/http/controllers/api/auth/auth.service')
const { validationResult } = require("express-validator")
const authService = new AuthService();
let errorList = {}
class AuthController extends Controller {
    login(req, res, next) {
        try {
            errorList = {}
            const result = validationResult(req)
            if (result.isEmpty()) {
                authService.login(req, res, next)
            } else {
                this.errorHandler(result.errors, errorList)
                throw this.Exception(400, { messages: errorList })
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    getOtp(req, res, next) {
        try {
            errorList = {}
            const result = validationResult(req);
            if (result.isEmpty()) {
                const code = this.generateRandomNumber(6);
                const email = req.body.email;
                return res.status(201).json({
                    message : 'please check your mail'
                })
            } else {
                this.errorHandler(result.errors, errorList)
                throw this.Exception(400, { messages: errorList })
            }

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async register(req, res, next) {
        try {
            errorList = {}
            const result = validationResult(req)
            if (result.isEmpty()) {
                const userDetails = req.body;
                const result = await authService.register(userDetails)
                return res.status(201).json({
                    status : 201,
                    success : true,
                    ...result
                })
            } else {
                this.errorHandler(result.errors, errorList)
                throw this.Exception(400, { messages: errorList })
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}
module.exports = new AuthController()