const FormInstitutionRepositories = require("../repositories/FormInstitutionRepositories")
const DefineFinalDimensionConceptService = require("./DefineFinalDimensionConceptService")
const DefineIndicatorConceptAndNumberOfCriteriaService = require("./DefineIndicatorConceptAndNumberOfCriteriaService")
const VerifyCriteraResponseService = require("./VerifyCriteraResponseService")

class SendAssessmentService {
  async execute(institutionId, formId, { relatoFinal }) {
    let formInstitution = await FormInstitutionRepositories.findByInstitutionIdAndFormId(institutionId, formId)


    if (!formInstitution) {
      throw Error('Formulário não encontrado');
    }

    if (formInstitution.respondido) {
      throw Error('Você já enviou este formulário');
    }

    formInstitution.relatoFinal = relatoFinal
    await FormInstitutionRepositories.save(formInstitution)

    const verifyCriteraResponse = new VerifyCriteraResponseService()
    verifyCriteraResponse.execute(formInstitution)

    const defineIndicatorConceptAndNumberOfCriteria = new DefineIndicatorConceptAndNumberOfCriteriaService()
    formInstitution = await defineIndicatorConceptAndNumberOfCriteria.execute(formInstitution)
    const defineFinalDimensionConcept = new DefineFinalDimensionConceptService()
    formInstitution = defineFinalDimensionConcept.execute(formInstitution)

    formInstitution.respondido = true

    await FormInstitutionRepositories.save(formInstitution)

    return formInstitution
  }
}

module.exports = SendAssessmentService
