const InstitutionsRepository = require("../repositories/InstitutionsRepository")

class ShowInstitutionService {

  async execute(id, data) {
    const institutionExists = await InstitutionsRepository.findById(id)

    if (!institutionExists) {
      throw Error('Instituição não encontrada');
    }

    const institution = await InstitutionsRepository.findByIdAndUpdate(id, data)

    return institution
  }
}

module.exports = ShowInstitutionService
