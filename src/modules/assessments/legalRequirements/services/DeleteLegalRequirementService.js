const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const LegalRequirementsRepositories = require("../repositories/LegalRequirementsRepositories")

class DeleteLegalRequirementService {
  async execute(id) {
    const dimension = await LegalRequirementsRepositories.findById(id)

    if (!dimension) {
      throw Error('Formulário não encontrado');
    }

    const checkFormSituationByDimension = new CheckFormSituationService()
    await checkFormSituationByDimension.execute(dimension.formulario)

    await LegalRequirementsRepositories.delete(id)

    return true
  }
}

module.exports = DeleteLegalRequirementService
