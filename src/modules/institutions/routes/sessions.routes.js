const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const SessionsController = require("../controllers/SessionsController")
const InstitutionSessionValidator = require('../validators/InstitutionSession');

const routes = new Router();

const sessionsController = new SessionsController()

routes.post('/', validate(InstitutionSessionValidator), handle(sessionsController.create));

module.exports = routes;
