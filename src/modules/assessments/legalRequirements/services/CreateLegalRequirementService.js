const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const LegalRequirementsRepositories = require("../repositories/LegalRequirementsRepositories")


class CreateLegalRequirementService {
  async execute(formId, { titulo }) {
    const checkFormSituationByDimension = new CheckFormSituationService()
    await checkFormSituationByDimension.execute(formId)

    const requirement = await LegalRequirementsRepositories.create({ titulo })
    return requirement
  }
}

module.exports = CreateLegalRequirementService
