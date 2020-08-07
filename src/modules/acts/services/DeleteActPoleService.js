const FilesRepository = require("../../files/repositories/FilesRepository")
const ActPolesRepository = require("../repositories/ActPolesRepository")
const ActsRepository = require("../repositories/ActsRepository")

class DeleteActPoleService {
  async execute(id) {
    const actPole = await ActPolesRepository.findById(id);
    if (!actPole) {
      throw new Error('Vinculação não encontrado')
    }

    const { arquivoAto: fileId, ato: actId } = actPole

    await ActPolesRepository.findByActIdAndDelete(id)
    await FilesRepository.findByIdAndDelete(fileId)

    const act = await ActsRepository.findById(actId)
    const actPoleExists = await ActPolesRepository.findByActId(actId)

    if (!actPoleExists) {
      act.preparadoParaAvaliacao = false;
      await ActsRepository.save(act)
    }

    return true
  }
}

module.exports = DeleteActPoleService
