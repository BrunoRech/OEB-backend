const Pole = require("../entities/Pole")

class PolesRepositories {

  async findByInstitutionId(id) {
    const poles = await Pole.find().where({ instituicao: id })
    return poles
  }

  async findById(id) {
    const pole = await Pole.findById(id)
    return pole
  }

  async create(data) {
    const pole = await Pole.create(data)
    return pole
  }

  async findByIdAndUpdate(id, data) {
    const pole = await Pole.findByIdAndUpdate(id, data, { new: true })
    return pole
  }

  async delete(id) {
    await Pole.findByIdAndDelete(id)
  }

  async save(pole) {
    await pole.save()
  }

}

module.exports = new PolesRepositories()
