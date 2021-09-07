const router = require('express').Router()

const AuthRoutes = require("app/routes/auth.routes")
const ApiRoutes = require("app/routes/api.routes")
const RoutesManagement = require("app/http/middlewares/RoutesManagement")

router.use('/api', ApiRoutes)
router.use('/auth', RoutesManagement.ForbiddenToAccessAuthRoute, AuthRoutes)
module.exports = router





// const DashboardRoutes = require("app/http/middlewares/dashboard/index")
// router.use('/dahsboard', RedirectWithAuth.GoToAuthIfNotAuth, DashboardRoutes)