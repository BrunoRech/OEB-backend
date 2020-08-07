const DimensionsRepositories = require("../../dimensions/repositories/DimensionsRepositories")
const FormsRepositories = require("../../forms/repositories/FormsRepositories")
const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const IndicatorsRepositories = require("../repositories/IndicatorsRepositories")

class CreateIndicatorService {
  async execute(dimensionId, { titulo }) {
    const dimension = await DimensionsRepositories.findById(dimensionId);
    const form = await FormsRepositories.findById(dimension.formulario);

    const checkFormSituation = new CheckFormSituationService()
    await checkFormSituation.execute(form)

    const indicator = await IndicatorsRepositories.create({ titulo, dimensao: dimensionId })
    return indicator
  }
}

module.exports = CreateIndicatorService
