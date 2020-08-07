const FormsRepositories = require("../repositories/FormsRepositories")

class DeleteFormService {
  async execute(id) {
    const dimension = await FormsRepositories.findById(id)

    if (!dimension) {
      throw Error('Formulário não encontrado');
    }

    await FormsRepositories.delete(id)

    return true
  }
}

module.exports = DeleteFormService
