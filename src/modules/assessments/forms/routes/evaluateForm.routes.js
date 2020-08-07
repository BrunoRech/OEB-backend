const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('../../../../shared/middlewares/auth');
const EvaluateFormController = require("../controllers/EvaluateFormController");
const EvaluateFormInstitution = require('../validators/EvaluateFormInstitution');

const routes = new Router();

const evaluateFormController = new EvaluateFormController()

routes.use(authMiddleware)
routes.post('/:formId', validate(EvaluateFormInstitution), handle(evaluateFormController.create));

module.exports = routes;
