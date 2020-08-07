const DimensionsRepositories = require("../../dimensions/repositories/DimensionsRepositories")
const FormsRepositories = require("../../forms/repositories/FormsRepositories")
const CheckFormSituationService = require("../../forms/services/CheckFormSituationService")
const IndicatorsRepositories = require("../../indicators/repositories/IndicatorsRepositories")
const CriterionDescriptorsRepositores = require("../repositories/CriterionDescriptorsRepositores")


class DeleteCriterionDescriptorsService {
  async execute(id) {
    const descriptor = await CriterionDescriptorsRepositores.findById(id)

    if (!descriptor) {
      throw Error('Descritor não encontrado');
    }

    const indicator = await IndicatorsRepositories.findById(descriptor.indicador)
    const dimension = await DimensionsRepositories.findById(indicator.dimensao);
    const form = await FormsRepositories.findById(dimension.formulario);

    const checkFormSituation = new CheckFormSituationService()
    await checkFormSituation.execute(form)

    await CriterionDescriptorsRepositores.delete(id)

    return true
  }
}

module.exports = DeleteCriterionDescriptorsService
