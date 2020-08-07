const PolesRepositories = require("../repositories/PolesRepositories")

class ListPolesService {

  async execute(institutionId) {
    const acts = await PolesRepositories.findByInstitutionId(institutionId)
    return acts
  }
}

module.exports = ListPolesService
