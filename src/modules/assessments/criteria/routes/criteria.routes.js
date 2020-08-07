const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');


const authMiddleware = require('../../../../shared/middlewares/auth');
const authAdminMiddleware = require('../../../../shared/middlewares/authAdmin');
const CriteriaController = require("../controllers/CriteriaController");
const CriterionValidator = require('../validators/Criterion');

const routes = new Router();

const criteriaController = new CriteriaController()

routes.use(authMiddleware)
routes.get('/:indicatorId/criteria', criteriaController.list);
routes.get('/:indicatorId/criteria/:id', criteriaController.show);
routes.get('/:id', criteriaController.show);
routes.use(authAdminMiddleware)
routes.post('/:indicatorId/criteria', validate(CriterionValidator), handle(criteriaController.create));
routes.put('/:indicatorId/criteria/:id', validate(CriterionValidator), handle(criteriaController.update));
routes.put('/:id', validate(CriterionValidator), handle(criteriaController.update));
routes.delete('/:indicatorId/criteria/:id', criteriaController.delete);
routes.delete('/:id', criteriaController.delete);

module.exports = routes;
