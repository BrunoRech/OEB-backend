const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');


const authMiddleware = require('../../../../shared/middlewares/auth');
const authAdminMiddleware = require('../../../../shared/middlewares/authAdmin');
const criteriaRoutes = require("../../criteria/routes/criteria.routes")
const criteriaDescriptorsRoutes = require("../../criterionDescriptors/routes/criteriaDescriptors.routes")
const IndicatorsController = require("../controllers/IndicatorsController");
const IndicatorValidator = require('../validators/Indicator');

const routes = new Router();

const indicatorsController = new IndicatorsController()

routes.use(authMiddleware)
routes.get('/:dimensionId/indicators', indicatorsController.list);
routes.get('/:dimensionId/indicators/:id', indicatorsController.show);
routes.get('/:id', indicatorsController.show);
routes.use(authAdminMiddleware)
routes.use(criteriaRoutes)
routes.use(criteriaDescriptorsRoutes)
routes.post('/:dimensionId/indicators/', validate(IndicatorValidator), handle(indicatorsController.create));
routes.put('/:dimensionId/indicators/:id', validate(IndicatorValidator), handle(indicatorsController.update));
routes.put('/:id', validate(IndicatorValidator), handle(indicatorsController.update));
routes.delete('/:dimensionId/indicators/:id', indicatorsController.delete);
routes.delete('/:id', indicatorsController.delete);

module.exports = routes;
