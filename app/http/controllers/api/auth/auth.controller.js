const Controller = require("app/http/controllers/controller");
const AuthService = require('app/http/controllers/api/auth/auth.service')
const {validationResult} = require("express-validator")
const authService = new AuthService();
let errorList = {}
class AuthController extends Controller {
    login(req, res, next) {
        errorList = {}
        const result = validationResult(req)
        if (result.isEmpty()) {
            authService.login(req, res, next)
        } else {
            this.errorHandler(result.errors, errorList)
            res.status(401).json({
                status: 401,
                success: false,
                messages: errorList
            })
        }
    }
    register(req, res, next) {
        errorList = {}
        const result = validationResult(req)
        if (result.isEmpty()) {
            authService.register(req, res, next)
        } else {
            this.errorHandler(result.errors, errorList)
            res.status(401).json({
                status: 401,
                success: false,
                messages: errorList
            })
        }
    }
}
module.exports = new AuthController()