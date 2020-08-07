const { Router } = require('express');

const authMiddleware = require('../../../shared/middlewares/auth');
const validateFileSizeMiddleware = require("../../../shared/middlewares/validateFileSize");
const FilesController = require("../controllers/FilesController");

const routes = new Router();

const filesController = new FilesController();

routes.use(authMiddleware)
routes.get('/:id', filesController.show);
routes.post('/', validateFileSizeMiddleware, filesController.create);
routes.put('/:id', validateFileSizeMiddleware, filesController.update);
routes.delete('/:id', filesController.delete);

module.exports = routes;
