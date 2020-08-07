const AdminsRepository = require("../repositories/AdminsRepository")

class UpdateAdminService {

  async execute(id, data) {
    const adminExists = await AdminsRepository.findById(id)

    if (!adminExists) {
      throw Error('Administrador não encontrada');
    }

    const admin = await AdminsRepository.findByIdAndUpdate(id, data)

    return admin
  }
}

module.exports = UpdateAdminService
