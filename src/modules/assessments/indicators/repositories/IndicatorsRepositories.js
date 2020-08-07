const Indicator = require("../entities/Indicator")

class IndicatorsRepositories {

  async findByDimensionId(dimensionId) {
    const indicators = await Indicator.find().where({ dimensao: dimensionId })
    return indicators
  }

  async findById(id) {
    const indicator = await Indicator.findById(id)
    return indicator
  }

  async create(data) {
    const indicator = await Indicator.create(data)
    return indicator
  }

  async findByIdAndUpdate(id, data) {
    const indicator = await Indicator.findByIdAndUpdate(id, data, { new: true })
    return indicator
  }

  async delete(id) {
    await Indicator.findByIdAndDelete(id)
  }

  async save(indicator) {
    await indicator.save()
  }

}

module.exports = new IndicatorsRepositories()
