const InstitutionsRepository = require("../repositories/InstitutionsRepository")

class ChangeInstitutionStateService {

  async execute({ institutionId, ativa }) {
    const institution = await InstitutionsRepository.findById(institutionId)

    if (!institution) {
      throw Error('Instituição não encontrada');
    }

    institution.ativa = ativa;

    await InstitutionsRepository.save(institution)

    return institution
  }
}

module.exports = ChangeInstitutionStateService
