const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('../../../../shared/middlewares/auth');
const LegalRequirementsResponseController = require("../controllers/LegalRequirementsResponseController");
const LegalRequirementsResponseValidator = require("../validators/LegalRequirementsResponse");

const routes = new Router();

const legalRequirementsResponseController = new LegalRequirementsResponseController()

routes.use(authMiddleware);
routes.post(
  '/:formId',
  validate(LegalRequirementsResponseValidator),
  handle(legalRequirementsResponseController.create)
);


module.exports = routes;
