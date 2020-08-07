const { Router } = require('express');

const criteriaDescriptorsRoutes = require("./criteriaDescriptors.routes")

const routes = new Router();

routes.use('/criteria-descriptors', criteriaDescriptorsRoutes)

module.exports = routes;
