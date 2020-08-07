const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authAdminMiddleware = require('../../../shared/middlewares/authAdmin');
const AdminsController = require("../controllers/AdminsController")
const CreateAdminValidator = require('../validators/CreateAdmin');
const UpdateAdminValidator = require('../validators/UpdateAdmin');


const routes = new Router();

const adminsController = new AdminsController()

routes.post('/', validate(CreateAdminValidator), handle(adminsController.create));
routes.use(authAdminMiddleware)
routes.get('/:id', adminsController.show);
routes.put('/:id', validate(UpdateAdminValidator), handle(adminsController.update));

module.exports = routes;
