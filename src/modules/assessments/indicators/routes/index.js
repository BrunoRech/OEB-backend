const { Router } = require('express');

const indicatorsRoutes = require("./indicators.routes")

const routes = new Router();

routes.use('/indicators', indicatorsRoutes)

module.exports = routes;
