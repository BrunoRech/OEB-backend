const FormInstitutionRepositories = require("../repositories/FormInstitutionRepositories")

class EvaluateFormService {
  async execute(institutionId, formId, { relatoFinal }) {
    const formInstitution = await FormInstitutionRepositories.findByInstitutionIdAndFormId(institutionId, formId)


    if (!formInstitution) {
      throw Error('Formulário não encontrado');
    }

    formInstitution.relatoFinal = relatoFinal

    await FormInstitutionRepositories.save(formInstitution)

    return relatoFinal
  }
}

module.exports = EvaluateFormService
