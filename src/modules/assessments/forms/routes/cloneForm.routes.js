const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authAdminMiddleware = require('../../../../shared/middlewares/authAdmin');
const CloneFormsCotroller = require("../controllers/CloneFormsCotroller");
const FormValidator = require('../validators/Form');

const routes = new Router();

const cloneFormsCotroller = new CloneFormsCotroller()

routes.use(authAdminMiddleware)
routes.post('/:formId', validate(FormValidator), handle(cloneFormsCotroller.create));

module.exports = routes;
