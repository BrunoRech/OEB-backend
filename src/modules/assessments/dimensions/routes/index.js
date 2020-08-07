const { Router } = require('express');

const dimensionsRoutes = require("./dimensions.routes")
const evaluateDimensionsRoutes = require("./evaluateDimensions.routes")

const routes = new Router();

routes.use('/dimensions', dimensionsRoutes)
routes.use('/evaluate-dimension', evaluateDimensionsRoutes)

module.exports = routes;
