const Dimension = require("../entities/Dimension")

class DimensionsRepositories {

  async findByFormId(formId) {
    const dimensions = await Dimension.find().where({ formulario: formId })
    return dimensions
  }

  async findById(id) {
    const dimension = await Dimension.findById(id)
    return dimension
  }

  async create(data) {
    const dimension = await Dimension.create(data)
    return dimension
  }

  async findByIdAndUpdate(id, data) {
    const dimension = await Dimension.findByIdAndUpdate(id, data, { new: true })
    return dimension
  }

  async delete(id) {
    await Dimension.findByIdAndDelete(id)
  }

  async save(dimension) {
    await dimension.save()
  }

}

module.exports = new DimensionsRepositories()
