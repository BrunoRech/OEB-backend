const { Router } = require('express');

const authMiddleware = require('../../../shared/middlewares/auth');
const NotificationsController = require("../controllers/NotificationsController")

const routes = new Router();

const notificationsController = new NotificationsController()

routes.use(authMiddleware);
routes.get('/', notificationsController.list);
routes.put('/:id', notificationsController.update);
routes.delete('/:id', notificationsController.delete);

module.exports = routes;
