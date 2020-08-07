const InstitutionsRepository = require("../../institutions/repositories/InstitutionsRepository")
const NotificationsRepository = require("../../institutions/repositories/NotificationsRepository")
const ActsRepository = require("../repositories/ActsRepository")


class ApproveActService {
  async execute({ institutionId, actId }) {
    const institution = await InstitutionsRepository.findById(institutionId);

    if (!institution) {
      throw Error('Instituição não encontrada');
    }

    const act = await ActsRepository.findById(actId);

    if (!act) {
      throw Error('Ato não encontrado');
    }

    act.isApproved = true;
    act.wasSeen = true;

    await ActsRepository.save(act)

    await NotificationsRepository.create({
      titulo: `Ato ${act.numeroAto}`,
      tipo: 1,
      instituicao: institutionId,
      dadosEntidade: act
    })

    return act
  }
}

module.exports = ApproveActService
