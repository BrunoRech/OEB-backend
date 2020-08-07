const { Router } = require('express');

const actPolesRoutes = require("./actPoles.routes")
const actsRoutes = require("./acts.routes")
const comunityRoutes = require("./comunity.routes")
const poulesRoutes = require("./poles.routes")
const validateActRoutes = require("./validateAct.routes")

const routes = new Router();

routes.use('/acts', actsRoutes)
routes.use('/poles', poulesRoutes)
routes.use('/associate-pole', actPolesRoutes)
routes.use('/validate-act', validateActRoutes)
routes.use('/public-consult', comunityRoutes)

module.exports = routes;
