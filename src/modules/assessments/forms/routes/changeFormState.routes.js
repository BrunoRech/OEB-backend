const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authAdminMiddleware = require('../../../../shared/middlewares/authAdmin');
const ChangeFormsStateController = require("../controllers/ChangeFormsStateController");
const ChangeFormStateValidator = require('../validators/ChangeFormState');

const routes = new Router();

const changeFormsStateController = new ChangeFormsStateController()

routes.use(authAdminMiddleware)
routes.put('/:formId', validate(ChangeFormStateValidator), handle(changeFormsStateController.update));

module.exports = routes;
