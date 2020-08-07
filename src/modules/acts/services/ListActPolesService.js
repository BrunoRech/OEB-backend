const ActPolesRepository = require("../repositories/ActPolesRepository")
const ActsRepository = require("../repositories/ActsRepository")

class ListActPolesService {

  async execute(id) {
    const act = await ActsRepository.findById(id)

    if (!act) {
      throw Error('Ato não encontrado');
    }

    const actPoles = await ActPolesRepository.findPolesByActId(id)

    return actPoles
  }
}

module.exports = ListActPolesService
