const { Router } = require('express');

const authMiddleware = require('../../../../shared/middlewares/auth');
const InstitutionsAssessmentController = require("../controllers/InstitutionsAssessmentController");

const routes = new Router();

const institutionsAssessmentController = new InstitutionsAssessmentController()

routes.use(authMiddleware)
routes.get('/', institutionsAssessmentController.list);

module.exports = routes;
