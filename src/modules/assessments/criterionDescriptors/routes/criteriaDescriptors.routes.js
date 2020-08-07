const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('../../../../shared/middlewares/auth');
const authAdminMiddleware = require('../../../../shared/middlewares/authAdmin');
const CriterionDescriptorsController = require("../controllers/CriterionDescriptorsController");
const CriterionDescriptionValidator = require('../validators/CriterionDescription');

const routes = new Router();

const criterionDescriptorsController = new CriterionDescriptorsController()

routes.use(authMiddleware)
routes.get('/:indicatorId/criteria-descriptors', criterionDescriptorsController.list);
routes.get('/:indicatorId/criteria-descriptors/:id', criterionDescriptorsController.show);
routes.get('/:id', criterionDescriptorsController.show);
routes.use(authAdminMiddleware)
routes.post('/:indicatorId/criteria-descriptors', validate(CriterionDescriptionValidator), handle(criterionDescriptorsController.create));
routes.put('/:indicatorId/criteria-descriptors/:id', validate(CriterionDescriptionValidator), handle(criterionDescriptorsController.update));
routes.put('/:id', validate(CriterionDescriptionValidator), handle(criterionDescriptorsController.update));
routes.delete('/:indicatorId/criteria-descriptors/:id', criterionDescriptorsController.delete);
routes.delete('/:id', criterionDescriptorsController.delete);

module.exports = routes;
