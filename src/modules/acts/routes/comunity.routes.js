const { Router } = require('express');

const ComunitiesController = require("../controllers/ComunitiesController")

const routes = new Router();

const comunitiesController = new ComunitiesController()


routes.get('/', comunitiesController.list);

module.exports = routes;
