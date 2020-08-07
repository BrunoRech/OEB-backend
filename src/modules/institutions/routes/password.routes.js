const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');


const authMiddleware = require('../../../shared/middlewares/auth');
const PasswordController = require("../controllers/PasswordController")
const ChangePasswordValidator = require('../validators/ChangePassword');

const routes = new Router();

const passwordController = new PasswordController()

routes.use(authMiddleware)
routes.put('/', validate(ChangePasswordValidator), handle(passwordController.update));

module.exports = routes;
