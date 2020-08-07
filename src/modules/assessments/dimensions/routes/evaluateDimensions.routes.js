const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('../../../../shared/middlewares/auth');
const EvaluateDimensionsController = require("../controllers/EvaluateDimensionsController");
const EvaluateDimensionValidator = require('../validators/EvaluateDimension');

const routes = new Router();

const evaluateDimensionsController = new EvaluateDimensionsController()

routes.use(authMiddleware)
routes.post('/:dimensionId', validate(EvaluateDimensionValidator), handle(evaluateDimensionsController.create));

module.exports = routes;
