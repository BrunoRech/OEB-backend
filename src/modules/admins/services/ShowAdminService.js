const AdminsRepository = require("../repositories/AdminsRepository")

class ShowAdminService {

  async execute(id) {
    const admin = await AdminsRepository.findById(id)

    if (!admin) {
      throw Error('Administrador não encontrado');
    }

    return admin
  }
}

module.exports = ShowAdminService
