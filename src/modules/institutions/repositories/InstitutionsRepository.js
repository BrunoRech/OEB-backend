const Institution = require("../entities/Institution")

class InstitutionsRepository {

  async findAll() {
    const institutions = await Institution.find()
    return institutions
  }

  async findAllWithPagination(filter, pageOptions) {
    const institutions = await Institution.paginate(filter, pageOptions);
    return institutions
  }

  async findById(id) {
    const institution = await Institution.findById(id)
    return institution
  }

  async findByEmail(email) {
    const institution = await Institution.findOne({ email })
    return institution
  }

  async findByCnpj(cnpj) {
    const institution = await Institution.findOne({ cnpj })
    return institution
  }

  async create(data) {
    const institution = await Institution.create(data)
    return institution
  }

  async findByIdAndUpdate(id, data) {
    const institution = await Institution.findByIdAndUpdate(id, data, { new: true })
    return institution
  }

  async findByIdAndDelete(id) {
    await Institution.findByIdAndDelete(id)
  }

  async save(institution) {
    await institution.save()
  }

}

module.exports = new InstitutionsRepository()
