const { Router } = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');


const authMiddleware = require('../../../../shared/middlewares/auth');
const authAdminMiddleware = require('../../../../shared/middlewares/authAdmin');
const dimensionsRoutes = require("../../dimensions/routes/dimensions.routes")
const legalRequirementsRoutes = require("../../legalRequirements/routes/legalRequirements.routes")
const FormsController = require("../controllers/FormsController");
const FormValidator = require('../validators/Form');

const routes = new Router();

const formsController = new FormsController()

routes.use(authMiddleware)
routes.get('/', formsController.list);
routes.get('/:id', formsController.show);
routes.use(dimensionsRoutes)
routes.use(legalRequirementsRoutes)
routes.use(authAdminMiddleware)
routes.post('/', validate(FormValidator), handle(formsController.create));
routes.put('/:id', validate(FormValidator), handle(formsController.update));
routes.delete('/:id', formsController.delete);

module.exports = routes;
