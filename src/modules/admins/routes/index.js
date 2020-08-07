const { Router } = require('express');

const adminsRoutes = require("./admins.routes")
const dashboardRoutes = require("./dashboard.routes")
const passwordRoutes = require("./password.routes")
const sessiosRoutes = require("./sessions.routes")

const routes = new Router();

routes.use('/admins', adminsRoutes)
routes.use('/admin-sessions', sessiosRoutes)
routes.use('/admin-password', passwordRoutes)
routes.use('/dashboard-admin', dashboardRoutes)

module.exports = routes;
