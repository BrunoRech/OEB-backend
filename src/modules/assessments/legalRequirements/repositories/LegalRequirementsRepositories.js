const LegalRequirements = require("../entities/LegalRequirements")

class LegalRequirementsRepositories {

  async findByFormId(formId) {
    const legalRequirements = await LegalRequirements.find().where({ formulario: formId })
    return legalRequirements
  }

  async findById(id) {
    const legalRequirement = await LegalRequirements.findById(id)
    return legalRequirement
  }

  async create(data) {
    const legalRequirement = await LegalRequirements.create(data)
    return legalRequirement
  }

  async findByIdAndUpdate(id, data) {
    const legalRequirement = await LegalRequirements.findByIdAndUpdate(id, data, { new: true })
    return legalRequirement
  }

  async delete(id) {
    await LegalRequirements.findByIdAndDelete(id)
  }

  async save(legalRequirement) {
    await legalRequirement.save()
  }

}

module.exports = new LegalRequirementsRepositories()
