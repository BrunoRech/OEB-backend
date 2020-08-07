const { Router } = require('express');

const legalRequirementsRoutes = require("./legalRequirements.routes")
const legalRequirementsResponseRoutes = require("./legalRequirementsResponse.routes")

const routes = new Router();

routes.use('/legal-requirements', legalRequirementsRoutes)
routes.use('/legal-requirements-response', legalRequirementsResponseRoutes)

module.exports = routes;
