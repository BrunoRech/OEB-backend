const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');


const authMiddleware = require('../../../shared/middlewares/auth');
const ActPolesController = require("../controllers/ActPolesController")
const ActPoleValidator = require('../validators/ActPole');

const routes = new Router();

const actPolesController = new ActPolesController()

routes.use(authMiddleware);
routes.get('/:actId', actPolesController.list);
routes.post('/', validate(ActPoleValidator), handle(actPolesController.create));
routes.delete('/:id', actPolesController.delete);

module.exports = routes;
