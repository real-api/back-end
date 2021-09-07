class RoutesManagement {
    ForbiddenToAccessAuthRoute(req, res, next) {
        if (req.isAuthenticated()) {
            return res.status(403).json({
                status: 403,
                success: false,
                error : "Forbidden",
                message: "You are already logged in"
            })
        }
        next();
    }
    ForbiddenToAccessPanelRoute(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.json({
                status: 401,
                success: false,
                error : "Unauthorized",
                message: "Please log in to your account"
            })
        }
        next();
    }
}

module.exports = new RoutesManagement()