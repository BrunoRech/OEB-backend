const FormsRepositories = require("../repositories/FormsRepositories")
const NotifyAllInstitutionService = require("./NotifyAllInstitutionService")
const ValidateFormService = require("./ValidateFormService")

class ChangeFormStateService {
  async execute(formId, { situacao }) {

    const numberSituation = Number(situacao);

    const validateForm = new ValidateFormService()
    const validForm = await validateForm.execute(formId, { numberSituation })

    validForm.situacao = situacao;

    if (validForm.situacao === '2') {
      const notifyAllInstitutionService = new NotifyAllInstitutionService()
      const title = `Novo formulário ${validForm.anoAplicacao}`;
      await notifyAllInstitutionService.execute({ form: validForm, title });
    }


    await FormsRepositories.save(validForm)

    return validForm
  }
}

module.exports = ChangeFormStateService
