const CriteriaRepositories = require("../../criteria/repositories/CriteriaRepositories")
const CriterionDescriptorsRepositores = require("../../criterionDescriptors/repositories/CriterionDescriptorsRepositores")
const DimensionsRepositories = require("../../dimensions/repositories/DimensionsRepositories")
const IndicatorsRepositories = require("../../indicators/repositories/IndicatorsRepositories")
const LegalRequirementsRepositories = require("../../legalRequirements/repositories/LegalRequirementsRepositories")
const FormsRepositories = require("../repositories/FormsRepositories")


class ValidateFormService {
  async execute(formId, { numberSituation }) {

    if (numberSituation <= 0 || numberSituation > 3) {
      throw Error('Situação está com um valor inválido!');
    }

    const form = await FormsRepositories.findById(formId);

    if (!form) {
      throw Error('Formulário não encontrado');
    }

    if (form.situacao === "2") {
      throw Error('Formulário já está em aplicação');
    }

    const dimensions = await DimensionsRepositories.findByFormId(form._id)

    if (dimensions.length === 0) {
      throw Error('Este formulário precisa possuir pelo menos uma dimensão');
    }

    const requirements = await LegalRequirementsRepositories.findByFormId(form._id)
    if (requirements.length === 0) {
      throw Error('Este formulário precisa possuir pelo menos um requisito legal');
    }

    const dimensionsPromises = dimensions.map(async dimension => {
      const indicators = await IndicatorsRepositories.findByDimensionId(dimension._id)

      if (indicators.length === 0) {
        throw Error(
          'Este formulário precisa possuir pelo menos um indicador em cada dimensão'
        );
      }

      const indicatorsPrimises = indicators.map(async indicator => {
        const descriptionCriterions = await CriterionDescriptorsRepositores.findByIndicatorId(indicator._id)

        if (descriptionCriterions.length === 0) {
          throw Error(
            'Este formulário precisa possuir pelo menos um descritor para cada indicador'
          );
        }
        const criteria = await CriteriaRepositories.findByIndicatorId(indicator._id)
        if (criteria.length === 0) {
          throw Error(
            'Este formulário precisa possuir pelo menos um critério em cada indicador'
          );
        }
      });
      await Promise.all(indicatorsPrimises);
    });
    await Promise.all(dimensionsPromises);

    return form;

  }
}

module.exports = ValidateFormService
