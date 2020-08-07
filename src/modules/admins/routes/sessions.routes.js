const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const SessionsController = require("../controllers/SessionsController")
const AdminSessionValidator = require('../validators/AdminSession');

const routes = new Router();

const sessionsController = new SessionsController()

routes.post('/', validate(AdminSessionValidator), handle(sessionsController.create));

module.exports = routes;
