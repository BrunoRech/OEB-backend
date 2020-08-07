const FormInstitutionRepositories = require("../../forms/repositories/FormInstitutionRepositories")
const FormsRepositories = require("../../forms/repositories/FormsRepositories")


class CreateLegalRequirementsResponseService {
  async execute(institutionId, formId, { requisitos }) {
    const formInstitution = await FormInstitutionRepositories.findByInstitutionIdAndFormId(institutionId, formId)

    if (!formInstitution) {
      throw Error('Formulário não encontrado');
    }

    const form = await FormsRepositories.findById(formId);

    if (form.situacao !== '2') {
      throw Error('Este formulário ainda não foi aprovado pelo Conselho');
    }

    function findAndUpdateRequirement(currentRequirement) {
      requisitos.forEach(item => {
        if (String(item.requisito) === String(currentRequirement.requisitoExistente)) {
          currentRequirement.atende = item.atende
        }
      })
    }

    formInstitution.requisitosLegais.forEach((requirement) => {
      findAndUpdateRequirement(
        requirement
      )
    })
    await FormInstitutionRepositories.save(formInstitution)
    const { requisitosLegais } = formInstitution

    return requisitosLegais;
  }
}

module.exports = CreateLegalRequirementsResponseService
