const ActsRepository = require("../repositories/ActsRepository")

class ShowActService {

  async execute(id) {
    const act = await ActsRepository.findByIdWithPoles(id)

    if (!act) {
      throw Error('Ato não encontrado');
    }

    return act
  }
}

module.exports = ShowActService
