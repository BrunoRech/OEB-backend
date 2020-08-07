const CriteriaRepositories = require("../../criteria/repositories/CriteriaRepositories")
const CriterionDescriptorsRepositores = require("../../criterionDescriptors/repositories/CriterionDescriptorsRepositores")
const DimensionsRepositories = require("../../dimensions/repositories/DimensionsRepositories")
const IndicatorsRepositories = require("../../indicators/repositories/IndicatorsRepositories")
const LegalRequirementsRepositories = require("../../legalRequirements/repositories/LegalRequirementsRepositories")
const FormsRepositories = require("../repositories/FormsRepositories")

class CloneFormService {
  async execute(formId, { titulo, anoAplicacao, dataLimite }) {
    const form = await FormsRepositories.findById(formId);

    if (!form) {
      throw Error('Formulário não encontrado');
    }

    const newForm = await FormsRepositories.create({
      titulo,
      anoAplicacao,
      dataLimite
    })

    const dimensions = await DimensionsRepositories.findByFormId(formId)
    const requirements = await LegalRequirementsRepositories.findByFormId(formId)

    const dimensionsPromises = dimensions.map(async dimension => {
      const newDimension = await DimensionsRepositories.create({
        titulo: dimension.titulo,
        descricao: dimension.descricao,
        formulario: newForm._id
      });

      const indicators = await IndicatorsRepositories.findByDimensionId(dimension._id)

      const indicatorsPromises = indicators.map(async indicator => {
        const newIndicator = await IndicatorsRepositories.create({
          titulo: indicator.titulo,
          dimensao: newDimension._id
        });

        const descriptionCriteria = await CriterionDescriptorsRepositores.findByIndicatorId(indicator._id)

        const descriptionCriteriaPromises = descriptionCriteria.map(async description => {
          await CriterionDescriptorsRepositores.create({
            conceito: description.conceito,
            descricao: description.descricao,
            valorMinimo: description.valorMinimo,
            valorMaximo: description.valorMaximo,
            indicador: newIndicator._id
          });
        });

        await Promise.all(descriptionCriteriaPromises);
        const criteria = await CriteriaRepositories.findByIndicatorId(indicator._id)

        const criteriaPromises = criteria.map(async criterion => {
          await CriteriaRepositories.create({
            titulo: criterion.titulo,
            indicador: newIndicator._id
          });
        });

        await Promise.all(criteriaPromises);
      });

      await Promise.all(indicatorsPromises);
    });

    const requirementsPromises = requirements.map(async requirement => {
      await DimensionsRepositories.create({
        titulo: requirement.titulo,
        formulario: newForm._id
      });
    })

    await Promise.all(dimensionsPromises);
    await Promise.all(requirementsPromises);

    return newForm
  }
}

module.exports = CloneFormService
