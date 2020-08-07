const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authAdminMiddleware = require('../../../shared/middlewares/authAdmin');
const PasswordController = require("../controllers/PasswordController")
const ChangePasswordValidator = require('../validators/ChangePassword');

const routes = new Router();

const passwordController = new PasswordController()

routes.use(authAdminMiddleware)
routes.put('/', validate(ChangePasswordValidator), handle(passwordController.update));

module.exports = routes;
