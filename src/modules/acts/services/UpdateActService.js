const { isBefore, subDays } = require('date-fns');

const ActPolesRepository = require("../repositories/ActPolesRepository")
const ActsRepository = require("../repositories/ActsRepository")

class UpdateActService {
  async execute(id, data) {
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

    const act = await ActsRepository.findByIdAndUpdate(id, data)

    if (act.tipoMediacao !== 'EAD') {
      await ActPolesRepository.findByActIdAndRemove(id)
    }

    act.isApproved = false;
    act.wasSeen = false;
    await ActsRepository.save(act)

    return act
  }
}

module.exports = UpdateActService
