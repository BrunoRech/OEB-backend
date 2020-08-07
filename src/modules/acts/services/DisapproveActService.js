const InstitutionsRepository = require("../../institutions/repositories/InstitutionsRepository")
const NotificationsRepository = require("../../institutions/repositories/NotificationsRepository")
const ActsRepository = require("../repositories/ActsRepository")


class DisapproveActService {
  async execute({ institutionId, actId, message }) {
    const institution = await InstitutionsRepository.findById(institutionId);

    if (!institution) {
      throw Error('Instituição não encontrada');
    }

    const act = await ActsRepository.findById(actId);

    if (!act) {
      throw Error('Ato não encontrado');
    }

    act.isApproved = false;
    act.wasSeen = true;
    act.message = message;

    await ActsRepository.save(act)

    await NotificationsRepository.create({
      titulo: `Ato ${act.numeroAto}`,
      tipo: 1,
      conteudo: message,
      instituicao: institutionId,
      dadosEntidade: act
    })

    return act
  }
}

module.exports = DisapproveActService
