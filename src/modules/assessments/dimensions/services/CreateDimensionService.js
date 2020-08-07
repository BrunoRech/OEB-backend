const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const DimensionsRepositories = require("../repositories/DimensionsRepositories")

class CreateDimensionService {
  async execute(formId, { titulo, descricao }) {
    const checkFormSituationByDimension = new CheckFormSituationService()
    await checkFormSituationByDimension.execute(formId)

    const dimension = await DimensionsRepositories.create({
      titulo,
      descricao,
      formulario: formId
    })
    return dimension
  }
}

module.exports = CreateDimensionService
