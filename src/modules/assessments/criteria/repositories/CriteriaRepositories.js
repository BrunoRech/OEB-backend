const Criterion = require("../entities/Criterion")

class CriteriaRepositories {

  async findByIndicatorId(indicatorId) {
    const criteria = await Criterion.find().where({ indicador: indicatorId })
    return criteria
  }

  async findById(id) {
    const criterion = await Criterion.findById(id)
    return criterion
  }

  async create(data) {
    const criterion = await Criterion.create(data)
    return criterion
  }

  async findByIdAndUpdate(id, data) {
    const criterion = await Criterion.findByIdAndUpdate(id, data, { new: true })
    return criterion
  }

  async findByIdAndDelete(id) {
    await Criterion.findByIdAndDelete(id)
  }

  async delete(id) {
    await Criterion.findByIdAndDelete(id)
  }

  async save(criterion) {
    await criterion.save()
  }

}

module.exports = new CriteriaRepositories()
