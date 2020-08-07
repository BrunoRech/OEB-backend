const FilesRepository = require("../repositories/FilesRepository")

class DeleteFileService {
  async execute(id) {
    const file = await FilesRepository.findById(id)

    if (!file) {
      throw Error('Ato não encontrado');
    }

    await FilesRepository.delete(id)

    return true
  }
}

module.exports = DeleteFileService
