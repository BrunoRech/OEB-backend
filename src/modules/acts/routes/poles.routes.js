const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');


const authMiddleware = require('../../../shared/middlewares/auth');
const PolesController = require("../controllers/PolesController");
const PoleValidator = require('../validators/Pole');

const routes = new Router();

const polesController = new PolesController()

routes.use(authMiddleware)
routes.get('/', polesController.list);
routes.get('/:id', polesController.show);
routes.post('/', validate(PoleValidator), handle(polesController.create));
routes.put('/:id', validate(PoleValidator), handle(polesController.update));
routes.delete('/:id', polesController.delete);

module.exports = routes;
