const { Router } = require('express');

const authAdminMiddleware = require('../../../shared/middlewares/authAdmin');
const DashboardController = require("../controllers/DashboardController")

const routes = new Router();

const dashboardController = new DashboardController()

routes.use(authAdminMiddleware)
routes.get('/', dashboardController.show);

module.exports = routes;
