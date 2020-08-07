const { isBefore, subDays } = require('date-fns');

const InstitutionsRepository = require("../../institutions/repositories/InstitutionsRepository")
const ActsRepository = require("../repositories/ActsRepository")


class CreateActService {
  async execute(institutionId, data) {
    const { validadeTipoAto,
      validadeParecer,
      validadeCurriculo,
      tipoCurriculo } = data

    if (isBefore(validadeTipoAto, subDays(new Date(), 1))) {
      throw Error('Validade tipo Ato está com uma data passada');
    }

    if (isBefore(validadeParecer, subDays(new Date(), 1))) {
      throw Error('Validade do parecer está com uma data passada');
    }

    if (
      tipoCurriculo === 'Próprio' &&
      isBefore(validadeCurriculo, subDays(new Date(), 1))
    ) {
      throw Error('Validade do currículo está com uma data passada');
    }

    const institution = await InstitutionsRepository.findById(institutionId)

    if (!institution) {
      throw Error('Instituição não encontrada');
    }

    const act = await ActsRepository.create({ ...data, instituicao: institutionId })

    if (act.tipoMediacao === 'EAD') {
      act.preparadoParaAvaliacao = false;
    }

    await ActsRepository.save(act)
    return act
  }
}

module.exports = CreateActService
