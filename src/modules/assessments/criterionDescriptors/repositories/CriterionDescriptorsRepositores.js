const CriterionDescriptor = require("../entities/CriterionDescriptor")

class CriterionDescriptorsRepositores {

  async findByIndicatorId(indicatorId) {
    const descriptors = await CriterionDescriptor.find().where({ indicador: indicatorId })
    return descriptors
  }

  async findById(id) {
    const descriptor = await CriterionDescriptor.findById(id)
    return descriptor
  }

  async create(data) {
    const descriptor = await CriterionDescriptor.create(data)
    return descriptor
  }

  async findByIdAndUpdate(id, data) {
    const descriptor = await CriterionDescriptor.findByIdAndUpdate(id, data, { new: true })
    return descriptor
  }

  async delete(id) {
    await CriterionDescriptor.findByIdAndDelete(id)
  }

  async save(descriptor) {
    await descriptor.save()
  }

}

module.exports = new CriterionDescriptorsRepositores()
