const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const DimensionsRepositories = require("../repositories/DimensionsRepositories")

class DeleteDimensionService {
  async execute(id) {
    const dimension = await DimensionsRepositories.findById(id)

    if (!dimension) {
      throw Error('Dimensão não encontrado');
    }

    const checkFormSituationByDimension = new CheckFormSituationService()
    await checkFormSituationByDimension.execute(dimension.formulario)

    await DimensionsRepositories.delete(id)

    return true
  }
}

module.exports = DeleteDimensionService
