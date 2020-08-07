const DimensionsRepositories = require("../../dimensions/repositories/DimensionsRepositories")
const FormsRepositories = require("../../forms/repositories/FormsRepositories")
const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const IndicatorsRepositories = require("../repositories/IndicatorsRepositories")

class DeleteIndicatorService {
  async execute(id) {
    const indicator = await IndicatorsRepositories.findById(id)

    if (!indicator) {
      throw Error('Indicador não encontrado');
    }

    const dimension = await DimensionsRepositories.findById(indicator.dimensao);
    const form = await FormsRepositories.findById(dimension.formulario);

    const checkFormSituation = new CheckFormSituationService()
    await checkFormSituation.execute(form)

    await IndicatorsRepositories.delete(id)

    return true
  }
}

module.exports = DeleteIndicatorService
