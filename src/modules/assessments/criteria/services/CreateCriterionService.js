const DimensionsRepositories = require("../../dimensions/repositories/DimensionsRepositories")
const FormsRepositories = require("../../forms/repositories/FormsRepositories")
const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const IndicatorsRepositories = require("../../indicators/repositories/IndicatorsRepositories")
const CriteriaRepositories = require("../repositories/CriteriaRepositories")

class CreateCriterionService {
  async execute(indicatorId, { titulo }) {
    const indicator = await IndicatorsRepositories.findById(indicatorId)
    const dimension = await DimensionsRepositories.findById(indicator.dimensao);
    const form = await FormsRepositories.findById(dimension.formulario);

    const checkFormSituation = new CheckFormSituationService()
    await checkFormSituation.execute(form)

    const criterion = await CriteriaRepositories.create({ titulo, indicador: indicatorId })
    return criterion
  }
}

module.exports = CreateCriterionService
