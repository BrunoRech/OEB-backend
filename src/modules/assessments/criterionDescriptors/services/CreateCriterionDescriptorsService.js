const DimensionsRepositories = require("../../dimensions/repositories/DimensionsRepositories")
const FormsRepositories = require("../../forms/repositories/FormsRepositories")
const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const IndicatorsRepositories = require("../../indicators/repositories/IndicatorsRepositories")
const CriterionDescriptorsRepositores = require("../repositories/CriterionDescriptorsRepositores")


class CreateCriterionDescriptors {
  async execute(indicatorId, { conceito, descricao, valorMinimo, valorMaximo }) {
    const indicator = await IndicatorsRepositories.findById(indicatorId)
    const dimension = await DimensionsRepositories.findById(indicator.dimensao);
    const form = await FormsRepositories.findById(dimension.formulario);

    const checkFormSituation = new CheckFormSituationService()
    await checkFormSituation.execute(form)

    const descriptor = await CriterionDescriptorsRepositores.create({
      conceito,
      descricao,
      valorMinimo,
      valorMaximo,
      indicador: indicatorId
    })
    return descriptor
  }
}

module.exports = CreateCriterionDescriptors
