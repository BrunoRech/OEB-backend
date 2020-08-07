const InstitutionsRepository = require("../repositories/InstitutionsRepository")

class ShowInstitutionService {

  async execute(id) {
    const institution = await InstitutionsRepository.findById(id)

    if (!institution) {
      throw Error('Instituição não encontrada');
    }

    return institution
  }
}

module.exports = ShowInstitutionService
