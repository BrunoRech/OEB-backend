const FormInstitution = require("../entities/FormInstitution")

class FormInstitutionRepositories {

  async findAllByInstitutionIdWithPopulate(institutionId) {
    const formInstitution = await FormInstitution.find().where({
      instituicao: institutionId
    }).populate('formulario', null, { situacao: 2 })
      .populate('dimensoes.dimensaoExistente')
      .populate('requisitosLegais.requisitoExistente')
      .populate("dimensoes.indicadores.indicadorExistente")
      .populate("dimensoes.indicadores.respostasCriterios.criterioExistente")

    return formInstitution
  }

  async findOneByInstitutionIdAndFormIdWithPopulate(institutionId, formId) {
    const formInstitution = await FormInstitution.findOne().where({
      instituicao: institutionId,
      formulario: formId
    }).populate('formulario')
      .populate('dimensoes.dimensaoExistente')
      .populate('requisitosLegais.requisitoExistente')
      .populate("dimensoes.indicadores.indicadorExistente")
      .populate("dimensoes.indicadores.respostasCriterios.criterioExistente")
    return formInstitution
  }

  async findByInstitutionIdAndFormId(institutionId, formId) {
    const formInstitution = await FormInstitution.findOne().where({
      instituicao: institutionId,
      formulario: formId
    });

    return formInstitution
  }

  async findByInstitutionId(institutionId) {
    const formInstitution = await FormInstitution.findOne().where({
      instituicao: institutionId,
    });

    return formInstitution
  }

  async save(formInstitution) {
    await formInstitution.save()
  }

}

module.exports = new FormInstitutionRepositories()
