const { Router } = require('express');

const criteriaRoutes = require("./criteria.routes")

const routes = new Router();

routes.use('/criteria', criteriaRoutes)

module.exports = routes;
