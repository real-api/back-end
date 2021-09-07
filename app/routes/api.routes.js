const router = require('express').Router()
const PanelRoutes = require('app/routes/panel/index.routes');
const RoutesManagement = require("app/http/middlewares/RoutesManagement")
router.use('/panel',RoutesManagement.ForbiddenToAccessPanelRoute, PanelRoutes)
module.exports = router