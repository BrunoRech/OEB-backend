const { Router } = require('express');

const authAdminMiddleware = require('../../../shared/middlewares/authAdmin');
const ApproveActsController = require("../controllers/ApproveActsController")
const DisapproveActsController = require("../controllers/DisapproveActsController")
const ValidateActsController = require("../controllers/ValidateActsController")

const routes = new Router();

const approveActsController = new ApproveActsController()
const disapproveActsController = new DisapproveActsController()
const validateActsController = new ValidateActsController()

routes.use(authAdminMiddleware);
routes.get('/', validateActsController.list);
routes.put('/:institutionId/approve/:actId', approveActsController.update);
routes.put('/:institutionId/disapprove/:actId', disapproveActsController.update);

module.exports = routes;
