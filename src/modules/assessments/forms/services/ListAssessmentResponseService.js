const FormInstitutionRepositories = require("../repositories/FormInstitutionRepositories")

class ListAssessmentResponseService {
  async execute(institutionId) {
    const formInstitution = await FormInstitutionRepositories
      .findAllByInstitutionIdWithPopulate(institutionId);
    const formInstitutionResponse = formInstitution.filter(
      form => form.formulario !== null
    )

    return formInstitutionResponse
  }
}

module.exports = ListAssessmentResponseService
