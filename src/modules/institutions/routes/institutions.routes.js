const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('../../../shared/middlewares/auth');
const authAdminMiddleware = require('../../../shared/middlewares/authAdmin');
const InstitutionsController = require("../controllers/InstitutionsController")
const CreateInstitutionValidator = require('../validators/CreateInstitution');
const UpdateInstitutionValidator = require('../validators/UpdateInstitution');

const routes = new Router();

const institutionsController = new InstitutionsController()

routes.post('/', validate(CreateInstitutionValidator), handle(institutionsController.create));
routes.use(authMiddleware)
routes.get('/:id', institutionsController.show);
routes.put('/:id', validate(UpdateInstitutionValidator), handle(institutionsController.update));
routes.use(authAdminMiddleware)
routes.get("/", institutionsController.list)
routes.delete("/:id", institutionsController.delete)

module.exports = routes;
