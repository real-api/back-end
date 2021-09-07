const router = require('express').Router()
const AuthController = require('app/http/controllers/api/auth/auth.controller');
const AuthValidator = require("app/http/validators/auth.validator")
router.post('/register', AuthValidator.register(), AuthController.register)
router.post('/login', AuthValidator.login(), AuthController.login)
module.exports = router