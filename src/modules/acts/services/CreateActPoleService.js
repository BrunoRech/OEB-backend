const { isBefore, subDays, parseISO } = require('date-fns');

const ActPolesRepository = require("../repositories/ActPolesRepository")
const ActsRepository = require("../repositories/ActsRepository")
const PolesRepositories = require("../repositories/PolesRepositories")


class CreateActPoleService {
  async execute({ ato, polo, numeroAto, arquivoAto, validadeAto }) {
    const act = await ActsRepository.findById(ato);

    if (!act) {
      throw Error('Ato não encontrado');
    }

    const pole = await PolesRepositories.findById(polo);
    if (!pole) {
      throw Error('Polo não encontrado');
    }

    const actPoleExists = await ActPolesRepository.findByActAndPoleId(ato, polo)
    if (actPoleExists) {
      throw Error('Este Polo já está vinculado');
    }

    const parsedDate = parseISO(validadeAto)

    if (isBefore(parsedDate, subDays(new Date(), 1))) {
      throw Error('Validade está com uma data passada');
    }

    if (act.tipoMediacao !== 'EAD') {
      throw Error('O tipo mediação do Ato precisa ser EAD');
    }

    const actPole = await ActPolesRepository.create({
      ato,
      polo,
      numeroAto,
      arquivoAto,
      validadeAto
    })

    act.preparadoParaAvaliacao = true;
    await ActsRepository.save(act)

    return actPole
  }
}

module.exports = CreateActPoleService
