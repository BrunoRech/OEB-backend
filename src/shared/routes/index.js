const { Router } = require('express');

const routes = new Router();

const actsRoutes = require('../../modules/acts/routes/index')
const adminsRouter = require('../../modules/admins/routes/index')
const criteriaRoutes = require("../../modules/assessments/criteria/routes/index")
const criterionDescriptorsRoutes = require("../../modules/assessments/criterionDescriptors/routes/index")
const dimensionsRoutes = require("../../modules/assessments/dimensions/routes/index")
const formRoutes = require("../../modules/assessments/forms/routes/index")
const dindicatorsRoutes = require("../../modules/assessments/indicators/routes/index")
const legalRequirementsRoutes = require("../../modules/assessments/legalRequirements/routes/index")
const filesRoutes = require('../../modules/files/routes/index')
const institutionsRoutes = require('../../modules/institutions/routes/index')

routes.use(institutionsRoutes);
routes.use(adminsRouter);
routes.use(actsRoutes);
routes.use(filesRoutes);
routes.use(criteriaRoutes);
routes.use(criterionDescriptorsRoutes);
routes.use(dimensionsRoutes);
routes.use(formRoutes);
routes.use(dindicatorsRoutes);
routes.use(legalRequirementsRoutes);

module.exports = routes;
