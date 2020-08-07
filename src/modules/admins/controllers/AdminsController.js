const CreateAdminService = require('../services/CreateAdminService');
const ShowAdminService = require('../services/ShowAdminService');
const UpdateAdminService = require('../services/UpdateAdminService');

class AdminsController {
  async show(req, res) {
    const { id } = req.params

    const showAdmin = new ShowAdminService()
    const admin = await showAdmin.execute(id)
    delete admin.senha

    return res.json(admin)
  }

  async create(req, res) {
    const { body } = req

    const createAdmin = new CreateAdminService()
    const admin = await createAdmin.execute(body)
    delete admin.senha

    return res.json(admin)
  }

  async update(req, res) {
    const { id } = req.params
    const { body } = req

    delete body.cpf;

    const updateAdmin = new UpdateAdminService()
    const admin = await updateAdmin.execute(id, body)
    delete admin.senha

    return res.json(admin)
  }

}

module.exports = AdminsController;
