const Admin = require("../entities/Admin")

class AdminsRepository {

  async findById(id) {
    const admin = await Admin.findById(id)
    return admin
  }

  async findByEmail(email) {
    const admin = await Admin.findOne({ email })
    return admin
  }

  async findByCpf(cpf) {
    const admin = await Admin.findOne({ cpf })
    return admin
  }

  async create(data) {
    const admin = await Admin.create(data)
    return admin
  }

  async findByIdAndUpdate(id, data) {
    const admin = await Admin.findByIdAndUpdate(id, data, { new: true })
    return admin
  }

  async save(admin) {
    await admin.save()
  }

}

module.exports = new AdminsRepository()
