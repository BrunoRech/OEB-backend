const { Router } = require('express');

const filesRoutes = require("./files.routes")

const routes = new Router();

routes.use('/files', filesRoutes)

module.exports = routes;
