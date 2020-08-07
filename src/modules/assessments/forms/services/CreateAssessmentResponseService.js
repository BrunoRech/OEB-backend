const DimensionsRepositories = require("../../dimensions/repositories/DimensionsRepositories")
const IndicatorsRepositories = require("../../indicators/repositories/IndicatorsRepositories")
const FormInstitutionRepositories = require("../repositories/FormInstitutionRepositories")
const FormsRepositories = require("../repositories/FormsRepositories")


class CreateAssessmentResponseService {
  async execute(institutionId, indicatorId, { criterios }) {
    const indicator = await IndicatorsRepositories.findById(indicatorId)

    if (!indicator) {
      throw Error('Este critério não existe');
    }

    const dimension = await DimensionsRepositories.findById(indicator.dimensao);
    const form = await FormsRepositories.findById(dimension.formulario);

    if (form.situacao !== '2') {
      throw Error('Este formulário ainda não foi aprovado pelo Conselho');
    }

    const formInstitution = await FormInstitutionRepositories.findByInstitutionIdAndFormId(institutionId, form._id)

    if (!formInstitution) {
      throw Error('Formulário não encontrado');
    }

    function findAndUpdateCriterion(realCriteria, currentCriterion) {
      realCriteria.forEach(item => {
        if (String(item.criterioExistente) === String(currentCriterion.criterio)) {
          item.atende = currentCriterion.atende
        }
      })
    }

    let formInstitutionStatus = {};

    formInstitution.dimensoes.forEach((currentDimension) => {
      currentDimension.indicadores.forEach((currentIndicator) => {
        if (String(currentIndicator.indicadorExistente) === String(indicatorId)) {
          criterios.forEach(currentCriterion => {
            findAndUpdateCriterion(
              currentIndicator.respostasCriterios,
              currentCriterion
            )
          })
          formInstitutionStatus = currentDimension;
        }
      })
    })

    await FormInstitutionRepositories.save(formInstitution)

    return formInstitutionStatus;
  }
}

module.exports = CreateAssessmentResponseService
