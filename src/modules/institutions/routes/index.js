const { Router } = require('express');

const institutionStateRoutes = require("./institutionState.routes")
const institutionsRoutes = require("./institutions.routes")
const notificationsRoutes = require("./notifications.routes")
const passwordRoutes = require("./password.routes")
const sessiosRoutes = require("./sessions.routes")

const routes = new Router();

routes.use('/institutions', institutionsRoutes)
routes.use('/notifications', notificationsRoutes)
routes.use('/institution-sessions', sessiosRoutes)
routes.use('/institution-password', passwordRoutes)
routes.use('/change-institution-state', institutionStateRoutes)

module.exports = routes;
