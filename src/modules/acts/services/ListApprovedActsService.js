const InstitutionActFilter = require('../../../shared/utils/InstitutionActFilter');
const CommunitiesRepository = require("../repositories/CommunitiesRepository")

class ListApprovedActsService {

  async execute({ endereco, municipio, nome, curso }, pageOptions) {
    const acts = await CommunitiesRepository.findAllActsWithPagination(pageOptions)
    const { docs } = acts;
    const formattedData = [];

    docs
      .filter(act => {
        return act.isApproved;
      })
      .forEach(act => {
        if (
          InstitutionActFilter.validateAddress(act.instituicao, endereco) &&
          InstitutionActFilter.validateCity(act.instituicao, municipio) &&
          InstitutionActFilter.validateName(act.instituicao, nome) &&
          InstitutionActFilter.validateCourse(act, curso)
        ) {
          formattedData.push(act);
        }
      });

    acts.docs = formattedData;
    return acts
  }
}

module.exports = ListApprovedActsService
