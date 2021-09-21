const router = require('express').Router()
const AuthController = require('app/http/controllers/api/auth/auth.controller');
const AuthValidator = require("app/http/validators/auth.validator")
router.post('/register', AuthValidator.register(), (req, res, next) => {
    console.log(req.body);
    next()
}, AuthController.register)
router.post('/login', AuthValidator.login(),(req, res, next) => {
    console.log(req.body);
    next()
}, AuthController.login)
module.exports = router