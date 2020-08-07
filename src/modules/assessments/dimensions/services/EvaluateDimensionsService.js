const FormInstitutionRepositories = require("../../forms/repositories/FormInstitutionRepositories")

class DeleteDimensionService {
  async execute(instititonId, dimensionId, { relatoGlobal }) {
    const formInstitution = await FormInstitutionRepositories.findByInstitutionId(instititonId)

    const dimensionIndex = formInstitution.dimensoes.findIndex((dimension) => {
      return (String(dimension.dimensaoExistente) === String(dimensionId))
    })

    if (dimensionIndex === -1) {
      throw Error('Dimensão não encontrada');
    }

    formInstitution.dimensoes[dimensionIndex].relatoGlobal = relatoGlobal
    formInstitution.save()

    return relatoGlobal

  }
}

module.exports = DeleteDimensionService
