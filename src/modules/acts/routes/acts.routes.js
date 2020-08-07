const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');


const authMiddleware = require('../../../shared/middlewares/auth');
const ActsController = require("../controllers/ActsController")
const ActValidator = require('../validators/Act');

const routes = new Router();

const actsController = new ActsController()

routes.use(authMiddleware);
routes.get('/', actsController.list);
routes.get('/:id', actsController.show);
routes.post('/', validate(ActValidator), handle(actsController.create));
routes.put('/:id', validate(ActValidator), handle(actsController.update));
routes.delete('/:id', actsController.delete);

module.exports = routes;
