const ActsRepository = require("../repositories/ActsRepository")

class DeleteActService {
  async execute(id) {
    const act = await ActsRepository.findById(id)

    if (!act) {
      throw Error('Ato não encontrado');
    }

    await ActsRepository.delete(id)

    return true
  }
}

module.exports = DeleteActService
