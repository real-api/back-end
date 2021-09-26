const router = require('express').Router()
const cors = require("cors")
const AuthRoutes = require("app/routes/auth.routes")
const ApiRoutes = require("app/routes/api.routes")
const FakeRoutes = require("app/routes/fake/fake.routes")
const RoutesManagement = require("app/http/middlewares/RoutesManagement")
const Limiter = require("app/helpers/requestLimiter")
router.use('/api',Limiter, ApiRoutes)
router.use('/', FakeRoutes)
router.use('/auth', Limiter, RoutesManagement.ForbiddenToAccessAuthRoute, AuthRoutes)
module.exports = router





// const DashboardRoutes = require("app/http/middlewares/dashboard/index")
// router.use('/dahsboard', RedirectWithAuth.GoToAuthIfNotAuth, DashboardRoutes)