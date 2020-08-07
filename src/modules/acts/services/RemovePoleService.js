const ActPolesRepository = require("../repositories/ActPolesRepository")
const PolesRepositories = require("../repositories/PolesRepositories")

class RemovePoleService {
  async execute(id) {
    const pole = await PolesRepositories.findById(id)

    if (!pole) {
      throw Error('Polo não encontrado');
    }

    const actPoleExists = await ActPolesRepository.findByPoleId(id)

    if (actPoleExists) {
      throw Error('Este Polo está vinculado a um Ato');
    }

    await PolesRepositories.delete(id)

    return true
  }
}

module.exports = RemovePoleService
