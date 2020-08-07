const FormsRepositories = require("../repositories/FormsRepositories")

class CheckFormSituationService {
  async execute(formId) {
    const form = await FormsRepositories.findById(formId)
    if (form.situacao === '2') {
      throw Error('Este formulário já está em aplicação');
    }
  }
}

module.exports = CheckFormSituationService
