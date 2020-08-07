const InstitutionsRepository = require("../../institutions/repositories/InstitutionsRepository")
const PolesRepositories = require("../repositories/PolesRepositories")


class CreatePoleService {
  async execute(institutionId, data) {
    const institution = await InstitutionsRepository.findById(institutionId)
    if (!institution) {
      throw Error('Instituição não encontrada');
    }

    const pole = await PolesRepositories.create({ ...data, instituicao: institutionId })

    await PolesRepositories.save(pole)
    return pole
  }
}

module.exports = CreatePoleService

