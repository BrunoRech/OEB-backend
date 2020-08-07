const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('../../../../shared/middlewares/auth');
const SendAssessmentController = require("../controllers/SendAssessmentController");
const EvaluateFormInstitution = require('../validators/EvaluateFormInstitution');

const routes = new Router();

const sendAssessmentController = new SendAssessmentController()

routes.use(authMiddleware)
routes.post('/:formId', validate(EvaluateFormInstitution), handle(sendAssessmentController.create));

module.exports = routes;
