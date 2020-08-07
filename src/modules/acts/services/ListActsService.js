const ActsRepository = require("../repositories/ActsRepository")

class ListActsService {

  async execute(institutionId) {
    const acts = await ActsRepository.findByInstitutionId(institutionId)
    return acts
  }
}

module.exports = ListActsService
