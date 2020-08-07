const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('../../../../shared/middlewares/auth');
const authAdminMiddleware = require('../../../../shared/middlewares/authAdmin');
const LegalRequirementsControllerController = require("../controllers/LegalRequirementsController");
const LegalRequirementsValidator = require('../validators/LegalRequirements');

const routes = new Router();

const legalRequirementsControllerController = new LegalRequirementsControllerController()

routes.use(authMiddleware)
routes.get('/:formId/legal-requirements', legalRequirementsControllerController.list);
routes.get('/:formId/legal-requirements/:id', legalRequirementsControllerController.show);
routes.get('/:id', legalRequirementsControllerController.show);
routes.use(authAdminMiddleware)
routes.post('/:formId/legal-requirements', validate(LegalRequirementsValidator), handle(legalRequirementsControllerController.create));
routes.put('/:formId/legal-requirements/:id', validate(LegalRequirementsValidator), handle(legalRequirementsControllerController.update));
routes.delete('/:formId/legal-requirements/:id', legalRequirementsControllerController.delete);
routes.delete('/:id', legalRequirementsControllerController.delete);

module.exports = routes;
