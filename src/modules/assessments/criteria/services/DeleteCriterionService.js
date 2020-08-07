const DimensionsRepositories = require("../../dimensions/repositories/DimensionsRepositories")
const FormsRepositories = require("../../forms/repositories/FormsRepositories")
const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const IndicatorsRepositories = require("../../indicators/repositories/IndicatorsRepositories")
const CriteriaRepositories = require("../repositories/CriteriaRepositories")

class DeleteCriterionService {
  async execute(id) {
    const criterion = await CriteriaRepositories.findById(id)

    if (!criterion) {
      throw Error('Critério não encontrado');
    }

    const indicator = await IndicatorsRepositories.findById(criterion.indicador)
    const dimension = await DimensionsRepositories.findById(indicator.dimensao);
    const form = await FormsRepositories.findById(dimension.formulario);

    const checkFormSituation = new CheckFormSituationService()
    await checkFormSituation.execute(form)

    await CriteriaRepositories.delete(id)

    return true
  }
}

module.exports = DeleteCriterionService
