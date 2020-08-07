const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('../../../../shared/middlewares/auth');
const authAdminMiddleware = require('../../../../shared/middlewares/authAdmin');
const indicatorsRoutes = require("../../indicators/routes/indicators.routes")
const DimensionsController = require("../controllers/DimensionsController");
const DimensionValidator = require('../validators/Dimension');

const routes = new Router();

const dimensionsController = new DimensionsController()

routes.use(authMiddleware)
routes.get('/:formId/dimensions', dimensionsController.list);
routes.get('/:formId/dimensions/:id', dimensionsController.show);
routes.get('/:id', dimensionsController.show);
routes.use(indicatorsRoutes)
routes.use(authAdminMiddleware)
routes.post('/:formId/dimensions', validate(DimensionValidator), handle(dimensionsController.create));
routes.put('/:formId/dimensions/:id', validate(DimensionValidator), handle(dimensionsController.update));
routes.delete('/:formId/dimensions/:id', dimensionsController.delete);
routes.delete('/:id', dimensionsController.delete);

module.exports = routes;
