const FormInstitutionRepositories = require("../repositories/FormInstitutionRepositories")

class ShowAssessmentResponseService {
  async execute(institutionId, formId, { indicator }) {
    const formInstitution = await FormInstitutionRepositories
      .findOneByInstitutionIdAndFormIdWithPopulate(institutionId, formId);

    if (!formInstitution || formInstitution.formulario.situacao !== "2") {
      throw Error('Formulário não encontrado');
    }

    if (indicator) {
      let indicatorExists = null;
      formInstitution.dimensoes.forEach(dimension => {
        dimension.indicadores.forEach(currentIndiator => {
          const currentIndiacorId = String(currentIndiator.indicadorExistente._id)
          const queryIndicatorId = String(indicator)
          if (currentIndiacorId === queryIndicatorId) {
            indicatorExists = currentIndiator
          }
        })
      })

      if (indicatorExists) {
        return indicatorExists
      }

      throw Error('Indicador não encontrado');
    }

    return formInstitution
  }
}

module.exports = ShowAssessmentResponseService
