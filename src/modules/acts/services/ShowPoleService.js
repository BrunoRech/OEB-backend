const PolesRepositories = require("../repositories/PolesRepositories")

class ShowPoleService {

  async execute(id) {
    const pole = await PolesRepositories.findById(id)

    if (!pole) {
      throw Error('Polo não encontrado');
    }

    return pole
  }
}

module.exports = ShowPoleService
