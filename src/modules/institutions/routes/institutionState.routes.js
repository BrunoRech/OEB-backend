const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authAdminMiddleware = require('../../../shared/middlewares/authAdmin');
const InstitutionStateController = require("../controllers/InstitutionStateController")
const ChangeInstitutionState = require('../validators/ChangeInstitutionState');

const routes = new Router();

const institutionStateController = new InstitutionStateController()

routes.use(authAdminMiddleware)
routes.put('/:institutionId', validate(ChangeInstitutionState), handle(institutionStateController.update));

module.exports = routes;
