const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('../../../../shared/middlewares/auth');
const AssessmentResponseController = require("../controllers/AssessmentResponseController");
const AssessmentResponseValidator = require("../validators/AssessmentResponse");

const routes = new Router();

const assessmentResponseController = new AssessmentResponseController()

routes.use(authMiddleware)
routes.get('/', assessmentResponseController.list);
routes.get('/:formId', assessmentResponseController.show);
routes.post(
  '/:indicatorId',
  validate(AssessmentResponseValidator),
  handle(assessmentResponseController.create)
);

module.exports = routes;
